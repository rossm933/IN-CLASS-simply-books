import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleAuthor } from '../../../api/authorData';
import AuthorForm from '../../../components/forms/AuthorForm';

export default function EditAuthor() {
// inside component use
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  // TODO: grab the firebaseKey
  const { firebaseKey } = router.query;

  // TODO: make a call to the API to get the book data
  useEffect(() => {
    getSingleAuthor(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  // TODO: pass object to form
  return (<AuthorForm authorObj={editItem} />);
}
