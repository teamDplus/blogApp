import React from 'react'
import { getAuth, signInWithPopup } from "firebase/auth";
import { auth, provider } from '../../utils/firebase';
import "../../css/components/FacebookLogin.css"
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';

export const FacebookLogin = () => {
    const navigate = useNavigate();

    const handleFacebookLogin = (e) => {
        e.preventDefault();
        signInWithPopup(auth, provider)
          .then((result) => {
            const user = result.user 
            const id = user.uid;
            const templateParams = {
                user_email: user.email,
                user_name: user.displayName,
                user_id: user.uid // 追加のパラメータとしてユーザーIDを送信
            };

            emailjs.send(
                "service_5q2o226", // Replace with your service ID
                'template_ngpieof', // Replace with your template ID
                templateParams,  
                '2Vgz4SVsfbbHGBkXB'      // Replace with your user ID
            ).then((response) => {
                console.log('SUCCESS!', response.status, response.text);
            }).catch((error) => {
                console.error('FAILED...', error);
            });
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
