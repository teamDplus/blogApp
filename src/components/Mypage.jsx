import { onAuthStateChanged, signOut } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useNavigate} from 'react-router-dom'
import '../css/components/Mypage.css';
import { auth } from '../utils/firebase';

const Mypage = () => {
  const navigate = useNavigate();
  const [user,setUser] = useState()

  useEffect(() => {
    onAuthStateChanged(auth,(user) => {
        if(user){
            localStorage.setItem('user', user);
            setUser(user)
        }else{
           
        }
    })
},[])
  
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
      <p onClick={checkLogin}>check</p>
      <p onClick={handleSignOut} className='logout'>ログアウト</p>
    </div>
  )
}

export default Mypage