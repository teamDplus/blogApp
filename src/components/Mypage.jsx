import { onAuthStateChanged, signOut } from 'firebase/auth'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate} from 'react-router-dom'
import '../css/components/Mypage.css';
import { auth } from '../utils/firebase';
import AppContext from '../context/AppContext';

const Mypage = () => {
  const navigate = useNavigate();
  const {user} = useContext(AppContext);

 useEffect(() => {
  if(!user){
    navigate("/")
  }
 },[user])
  
  const handleSignOut = () => {
    signOut(auth).then(() => {
      console.log("サインアウトしました。")
      navigate(`/`)
    }).catch((error) => {
      console.error(error)
    })
  }

  const checkLogin = () => {
    console.log(user)
  }
  
  return (
    <div>
      <h1>マイページ</h1>
      <button onClick={checkLogin}>check</button>
      <button onClick={handleSignOut} className='logout'>ログアウト</button>
    </div>
  )
}

export default Mypage