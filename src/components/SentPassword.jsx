import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import "../css/components/SentPassword.css"

export const SentPassword = () => {
    // パラメータに含まれるemailに関する情報を取得
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get('email');

  return (
    <div>
        <h2>パスワード再設定メールを送信しました</h2>
        <p>{email} にパスワード再設定メールを送信しました。</p>
        <Link to="/" className='to-top'>
            <p>トップへ戻る</p>
        </Link>
    </div>
  )
}
