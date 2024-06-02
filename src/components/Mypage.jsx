import { onAuthStateChanged, signOut } from 'firebase/auth'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate} from 'react-router-dom'
import '../css/components/Mypage.css';
import { auth } from '../utils/firebase';
import AppContext from '../context/AppContext';

const Mypage = () => {
  const navigate = useNavigate();
  const {user,loading} = useContext(AppContext);

 useEffect(() => {
  console.log(user)
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
  
  return (
    <div className='mypage'>
      <h1 className='mypage__title'>マイページ</h1>
      <button onClick={handleSignOut} className='logout'>ログアウト</button>
    </div>
  )
}

export default Mypage