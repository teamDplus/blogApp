import React, { useState } from 'react'
import { auth } from '../utils/firebase'
import { sendPasswordResetEmail } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';

export const ForgotPassword = () => {
    const [email,setEmail] = useState();
    const navigate = useNavigate();

    const submitPasswordResetEmail = async (e) => {
        e.preventDefault();
        await sendPasswordResetEmail(auth,email)
          .then((resp) => {
            // メール送信成功
            console.log("メール送信成功", resp);
            //　メールの送信が成功したら、新しいパスワードを入力する画面へリダイレクトする。このとき、送信したメールのアドレスをパラメータに含めておく。
            navigate(`/password_sent?email=${encodeURIComponent(email)}`)
          })
          .catch((error) => {
            // メール送信失敗
            console.log("メール送信失敗", error);
          });
      }

  return (
    <div>
        <h2>パスワード再設定メールを送る</h2>
        <form onSubmit={submitPasswordResetEmail}>
            <label htmlFor="email">メールアドレス</label>
            <input type="email" id="email" onChange={(e) => setEmail(e.target.value)}/>
            <button>送信</button>
        </form>
    </div>
  )
}
