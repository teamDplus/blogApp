import React from 'react'
import { getAuth, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { auth, provider } from '../../utils/firebase';
import "../../css/components/FacebookLogin.css"
import { useNavigate } from 'react-router-dom';

export const FacebookLogin = () => {
    const navigate = useNavigate();

    const handleFacebookLogin = (e) => {
        e.preventDefault();
        signInWithPopup(auth, provider)
          .then((result) => {
            const user = result.user 
            const id = user.uid;
            console.log(user)
            navigate(`/${id}`)
          })
          .catch((error) => {
            console.log(error)
          });

    }
  return (
    <div>
        <div onClick={handleFacebookLogin} className='FacebookLogin-img'>
            <img src="facebookIcon.png" alt="" />
        </div>
    </div>
  )
}
