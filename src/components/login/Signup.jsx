import { createUserWithEmailAndPassword } from 'firebase/auth';
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

  // モーダルで「はい」を押したときにFirbaseへ登録する
  const signUp = (e) => {
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
      <SignupCheckModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={signUp}
        email={email}
        password={password}
      />
    </div>
  )
}
export default Signup