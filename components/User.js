import React from 'react';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { signOut } from '../utils/auth';

export default function UserProfile() {
  const { user } = useAuth();
  return (
    <div>
      <h1>{user.displayName}</h1>
      <img src={user.photoURL} alt="userURL" />
      <h3>{user.email}</h3>
      <h4>Last Sign In: {user.metadata.lastSignInTime}</h4>
      <Button type="button" variant="danger" size="lg" className="copy-btn" onClick={signOut}>
        Sign Out
      </Button>
    </div>
  );
}
