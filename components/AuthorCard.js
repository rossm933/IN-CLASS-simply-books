import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
// import { deleteSingleAuthor } from '../api/authorData';
import { deleteAuthorBooks } from '../api/mergedData';
import { updateAuthor } from '../api/authorData';

function AuthorCard({ authorObj, onUpdate }) {
  const toggleFavorite = () => {
    if (authorObj.favorite) {
      updateAuthor({ ...authorObj, favorite: false }).then(onUpdate);
    } else {
      updateAuthor({ ...authorObj, favorite: true }).then(onUpdate);
    }
  };
  // FOR DELETE, WE NEED TO REMOVE THE BOOK AND HAVE THE VIEW RERENDER,
  // SO WE PASS THE FUNCTION FROM THE PARENT THAT GETS THE BOOKS
  const deleteThisAuthor = () => {
    if (window.confirm(`Delete ${authorObj.firebaseKey}?`)) {
      deleteAuthorBooks(authorObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Img src={authorObj.image} />
        <Card.Title> {authorObj.first_name} {authorObj.last_name} <Button onClick={toggleFavorite}><span>{authorObj.favorite ? '❤️' : '🤍'}</span></Button></Card.Title>
        <Card.Text>{authorObj.email}</Card.Text>
        {/* DYNAMIC LINK TO VIEW THE BOOK DETAILS  */}
        <Link href={`/author/${authorObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        {/* DYNAMIC LINK TO EDIT THE BOOK DETAILS  */}
        <Link href={`/author/edit/${authorObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisAuthor} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

AuthorCard.propTypes = {
  authorObj: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    image: PropTypes.string,
    favorite: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default AuthorCard;
