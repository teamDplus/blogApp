import {  signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';

const Login = () => {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

    const signIn = (e) => {
      e.preventDefault(); 
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
      navigate(`/mypage/${user.uid}`)
      console.log(user)
      })
      .catch((error) => {
      });
    }

  return (
    <div class="">
        <div class="">
          <div class="">
              <h1 class="">
                  管理者ログイン
              </h1>
              <form onSubmit={signIn} class="">
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
        </div>
    </div>
  )
}

export default Login