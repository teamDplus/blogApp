import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';
import { Link } from 'react-router-dom';
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
        console.log(user)
        navigate(`/${user.uid}`)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const submitPasswordResetEmail = async () => {
    await auth
      .sendPasswordResetEmail(email)
      .then((resp) => {
        // メール送信成功
      })
      .catch((error) => {
        // メール送信失敗
        console.log(error)
      })
  }

  return (
    <div className="login">
      <h1 className="login__title">ログイン</h1>
      <form onSubmit={signIn} className="login__form">
        <div>
          <label htmlFor="email" className="">メールアドレス</label>
          <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="" placeholder="name@company.com" required="" />
        </div>
        <div>
          <label htmlFor="password" className="">パスワード</label>
          <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="" required="" />
        </div>
        <button type="submit" className="login__button">ログイン</button>
      </form>
      <div className='login__text'>
        <p>アカウントをお持ちではない方
          <Link to="/signup" className="login__text--link">
            新規登録
          </Link>
        </p>
      </div>
      <div className='forgot__password'>
        <Link to="/forgot_password">パスワードを忘れた場合</Link>
      </div>
    </div>

  )
}

export default Login