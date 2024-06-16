import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import React, { useContext } from 'react'
import { auth } from '../../utils/firebase';
import { Link } from 'react-router-dom';
import AppContext from '../../context/AppContext';

export const VerifyEmail = () => {
  const { user } = useContext(AppContext);
  if (isSignInWithEmailLink(auth, window.location.href)) {

    let email = window.localStorage.getItem('emailForSignIn');
    
    signInWithEmailLink(auth, email, window.location.href)
      .then((result) => {
        window.localStorage.removeItem('emailForSignIn');

      })
      .catch((error) => {

      });
  }
  
  return (
    <div>
      <h1>メールを認証しました！</h1>
      <Link to={user && `/${user.uid}`}>
        マイページへ
      </Link>
    </div>
  )
}
