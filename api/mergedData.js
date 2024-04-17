import { getAuthorBooks, getSingleAuthor, deleteSingleAuthor } from './authorData';
import { getSingleBook, deleteBook } from './bookData';

const viewBookDetails = (bookFirebaseKey) => new Promise((resolve, reject) => {
  getSingleBook(bookFirebaseKey)
    .then((bookObject) => {
      getSingleAuthor(bookObject.author_id)
        .then((authorObject) => {
          resolve({ authorObject, ...bookObject });
        });
    }).catch((error) => reject(error));
});

const viewAuthorDetails = (authorFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleAuthor(authorFirebaseKey), getAuthorBooks(authorFirebaseKey)])
    .then(([authorObject, authorBooksArray]) => {
      resolve({ ...authorObject, books: authorBooksArray });
    }).catch((error) => reject(error));
});

const deleteAuthorBooks = (authorId) => new Promise((resolve, reject) => {
  getAuthorBooks(authorId).then((booksArray) => {
    console.warn(booksArray, 'Author Books');
    const deleteBookPromises = booksArray.map((book) => deleteBook(book.firebaseKey));

    Promise.all(deleteBookPromises).then(() => {
      deleteSingleAuthor(authorId).then(resolve);
    });
  }).catch((error) => reject(error));
});
// TODO: STRETCH...SEARCH BOOKS
// const searchStore = async (searchValue, uid) => {
//   const allBooks = await getBooks(uid);
//   const allAuthors = await getAuthors(uid);

//   const filteredBooks = await allBooks.filter((book) => (
//     book.title.toLowerCase().includes(searchValue)
//     || book.description.toLowerCase().includes(searchValue)
//     || book.price.includes(parseInt(searchValue, 10))
//   ));

//   const filteredAuthors = await allAuthors.filter((author) => (
//     author.first_name.toLowerCase().includes(searchValue)
//     || author.last_name.toLowerCase().includes(searchValue)
//     || author.email.toLowerCase().includes(searchValue)
//   ));

//   return { books: filteredBooks, authors: filteredAuthors };
// };
export { viewBookDetails, viewAuthorDetails, deleteAuthorBooks };
