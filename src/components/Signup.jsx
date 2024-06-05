import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';
import { Link } from 'react-router-dom';
import "../css/components/Login.css"
import "../css/components/Signup.css"

//ユーザ情報の登録
const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  //登録情報を確認するモーダルの開閉
  const openModal = (e) => {
    e.preventDefault();
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
      <form onSubmit={openModal} className="signup__form">
        <div>
          <label htmlFor="email" className="">メールアドレス</label>
          <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="" placeholder="name@company.com" required="" />
        </div>
        <div>
          <label htmlFor="password" className="">パスワード</label>
          <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="" required="" />
        </div>
        <button type="submit" className="signup__button">新規登録</button>
      </form>
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