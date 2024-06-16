import { createUserWithEmailAndPassword, sendSignInLinkToEmail } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../utils/firebase';
import { Link } from 'react-router-dom';
// import { collection, query, where, getDocs, updateDoc } from "firebase/firestore";

import "../../css/components/Login.css"
import "../../css/components/Signup.css"
import { XLogin } from './XLogin';
import { FacebookLogin } from './FacebookLogin';
import { useForm } from 'react-hook-form';

//ユーザ情報の登録
const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()


  //登録情報を確認するモーダルの開閉
  const openModal = (e) => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const actionCodeSettings = {
    url: 'http://localhost:3000/verify_email',
    handleCodeInApp: true
  };

  // モーダルで「はい」を押したときにFirbaseへ登録する
  const signUp = async(e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        console.log(userCredential);
      })
      .catch((error) => {
        console.error(error);
      });
      
    await sendSignInLinkToEmail(auth, email, actionCodeSettings)
  .then(() => {
    window.localStorage.setItem('emailForSignIn', email);
    alert("メールを送信しました！")
  })
  .catch((error) => {
    console.error(error)
  });
      // モーダルを閉じる
      setIsModalOpen(false);
  }


  return (
    <div className="signup">
      <h1 className="signup__title">ユーザ登録</h1>
      <form onSubmit={handleSubmit(openModal)} className="signup__form">
        <div>
          <label htmlFor="email" className="">メールアドレス</label>
          <input 
            type="email" 
            name="email"
            id="email" 
            className="" 
            placeholder="name@company.com" 
            required="" 
            {...register('email', {
              required: '必須入力',
              pattern: {
                value: /@gmail.com/,
                message: "gmail以外は登録できません。" 
              },
              onChange: (e) => setEmail(e.target.value) // カスタムonChangeハンドラ
            })}/>
            {errors.email && <span className="validation-message">{errors.email.message}</span>}
        </div>
        <div>
          <label htmlFor="password" className="">パスワード</label>
          <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="" required="" />
        </div>
        <button type="submit" className="signup__button">新規登録</button>
      </form>
      <div className='signup__sns'>
        <FacebookLogin/>
        <XLogin/>
      </div>
      <div className='signup__text'>
        <p>すでにアカウントをお持ちの方は
          <Link to="/login" className="signup__text--link">
            こちら
          </Link>
        </p>
      </div>
      <SignupChechModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={signUp}
        email={email}
        password={password}
      />
    </div>

  )
}

//登録情報を確認するモーダル
const SignupChechModal = ({ isOpen, onClose, onConfirm, email, password }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal__content">
        <h2>登録情報の確認</h2>
        <p>以下の情報で登録しますか？</p>
        <p><strong>メールアドレス:</strong> {email}</p>
        <p><strong>パスワード:</strong> {password}</p>
        <button onClick={onConfirm} className="modal__button--yes">はい</button>
        <button onClick={onClose} className="modal__button--no">いいえ</button>
      </div>
    </div>
  );
};

export default Signup