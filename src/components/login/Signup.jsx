import { createUserWithEmailAndPassword, sendSignInLinkToEmail } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../utils/firebase';
import { Link } from 'react-router-dom';
import SignupCheckModal from "../modal/SignupCheckModal"
import "../../css/components/Login.css"
import "../../css/components/Signup.css"
import { XLogin } from './XLogin';
import { FacebookLogin } from './FacebookLogin';
import { useForm } from 'react-hook-form';
import { db } from "../../utils/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import useModal from '../../hooks/useModal';

//ユーザ情報の登録
const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const {
    handleOpenModal,
    handleCloseModal,
    setIsModalOpen,
    isModalOpen,
  } = useModal();
  
  const actionCodeSettings = {
    url: 'http://localhost:3000/verify_email',
    handleCodeInApp: true
  };

  // モーダルで「はい」を押したときにFirbaseへ登録する
  const signUp = async(e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        console.log(userCredential);
        //登録が完了したらマイページに移動
        navigate(`/${user.uid}`);
      })
      .catch((error) => {
        console.error(error);
        alert('登録に失敗しました。再度お試しください。')
      });
      // モーダルを閉じる
      setIsModalOpen(false);
  //   await sendSignInLinkToEmail(auth, email, actionCodeSettings)
  // .then(() => {
  //   window.localStorage.setItem('emailForSignIn', email);
  //   alert("メールを送信しました！")
  // })
  // .catch((error) => {
  //   console.error(error)
  // });
      // モーダルを閉じる
      // setIsModalOpen(false);
  }

  //メールアドレスの重複を検知
  const checkSameEmail = async (email) => {
    const q = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    return querySnapshot.empty; // 重複がなければ true を返す
  }

  return (
    <div className="signup">
      <h1 className="signup__title">ユーザ登録</h1>
      <form onSubmit={handleSubmit(handleOpenModal)} className="signup__form">
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
              validate: {
                duplicated: async (email) => {
                  const isUnique = await checkSameEmail(email);
                  return isUnique || 'このメールアドレスは登録されています';
                }
              },
              onChange: (e) => setEmail(e.target.value) // カスタムonChangeハンドラ
            })} />
          {errors.email && <span className="validation-message">{errors.email.message}</span>}
        </div>
        <div>
          <label htmlFor="password" className="">パスワード</label>
          <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="" required="必須入力" />
        </div>
        <button type="submit" className="signup__button">新規登録</button>
      </form>
      <div className='signup__sns'>
        <FacebookLogin />
        <XLogin />
      </div>
      <div className='signup__text'>
        <p>すでにアカウントをお持ちの方は
          <Link to="/login" className="signup__text--link">
            こちら
          </Link>
        </p>
      </div>
      <SignupCheckModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={signUp}
        email={email}
        password={password}
      />
    </div>
  )
}
export default Signup