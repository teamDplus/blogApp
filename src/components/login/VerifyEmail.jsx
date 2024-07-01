import React, { useContext } from 'react';
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth'; // Make sure these imports are correct
import { auth } from '../../utils/firebase';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate

import AppContext from '../../context/AppContext';
import "../../css/components/VerifyEmail.css";

export const VerifyEmail = () => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate(); // Define navigate using useNavigate

  if (isSignInWithEmailLink(auth, window.location.href)) {
    let email = window.localStorage.getItem('emailForSignIn');

    signInWithEmailLink(auth, email, window.location.href)
      .then((result) => {
        window.localStorage.removeItem('emailForSignIn');
        // Redirect to appropriate page after successful sign-in
        navigate(user ? `/${user.uid}` : '/'); // Example: Redirect to user's page if user is defined
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className='verify'>
      <h1 className='verify__title'>メールを認証しました！</h1>
      <Link to={user ? `/${user.uid}` : '/'}>マイページへ</Link>
    </div>
  );
};

