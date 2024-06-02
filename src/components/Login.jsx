import {  signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';
import "../css/components/Login.css"


const Login = () => {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

    const signIn = (e) => {
      e.preventDefault(); 
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
      navigate(`/${user.uid}`)
      console.log(user)
      })
      .catch((error) => {
      });
    }

  return (
      <div className="login">
          <h1 className="login__title">ログイン</h1>
          <form onSubmit={signIn} className="login__form">
              <div>
                  <label for="email" class="">メールアドレス</label>
                  <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" class="" placeholder="name@company.com" required=""/>
              </div>
              <div>
                  <label for="password" class="">パスワード</label>
                  <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" class="" required=""/>
              </div>
              <button type="submit" class="">ログイン</button>
          </form>
      </div>
  )
}

export default Login