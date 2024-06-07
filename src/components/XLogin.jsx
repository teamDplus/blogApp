import React from 'react';
import { TwitterAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../utils/firebase';
import "../css/components/XLogin.css"
import { useNavigate } from 'react-router-dom';



export const XLogin = () => {
    const provider = new TwitterAuthProvider();
    const navigate = useNavigate();

const handleXLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const id = result.user.uid;
        navigate(`/${id}`)
      }).catch((error) => {
        console.error(error)
      });    
}
  return (
    <div>
        <div onClick={handleXLogin} className='XLogin-img'>
            <img src="xIcon.png" alt="" />
        </div>
    </div>
  )
}
