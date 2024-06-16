// import { useEffect, useState } from "react";
// import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
// import { auth } from "../../utils/firebase";
// import { Link, useNavigate } from "react-router-dom";
// import "../../css/components/ResetPassword.css"

// export const ResetPassword = () => {
//     const [actionCode, setActionCode] = useState('')
//     const [password, setPassword] = useState('')
//     const [mode, setMode] = useState('')
//     const [errorMessage, setErrorMessage] = useState(''); // エラーメッセージを保持するための状態
//     const [isSuccess, setIsSuccess] = useState(false); 
//     const navigate = useNavigate();

  
//     // 初回のレンダリングのみ
//     useEffect(() => {
//     //   URLに含まれる、oobCode（リクエストを検証するためのワンタイムコード）を取得
//       const queryParams = new URLSearchParams(window.location.search)
//       const oobCode = queryParams.get('oobCode') || '';
//       setActionCode(oobCode)
//     //   console.log(oobCode)
//     }, [])
  
//     const handleSubmit = (event) => {
//       event.preventDefault()
      
//       if (actionCode === '') {
//         setErrorMessage("無効なリセットコードです。もう一度お試しください。");
//         return;
//     }
// //   verifyPasswordResetCodeでアクションコードを確認することによって、パスワードの再設定リクエストを処理し、
// // 　その後ユーザーから新しいパスワードを取得して、それをconfirmPasswordResetに渡す。
//       verifyPasswordResetCode(auth, actionCode)
//         .then(() => {
//             confirmPasswordReset(auth, actionCode, password)
//             .then(async (resp) => {
//                 // パスワードのリセットが完了すると、パスワードを更新しました！と表示する。
//                 setIsSuccess(true)
//             })
//             .catch((error) => {
//                 console.error("Error resetting password:", error); // エラーログ
//                 if (error.code === 'auth/expired-action-code') {
//                     setErrorMessage("このリセットコードの有効期限が切れています。再度リセットを試みてください。");
//                 } else if (error.code === 'auth/invalid-action-code') {
//                     setErrorMessage("無効なリセットコードです。もう一度お試しください。");
//                 } else {
//                     setErrorMessage("パスワードリセットに失敗しました。もう一度お試しください。");
//                 }
//             })
//         })
//     }
  
//     return(
//       <>
//         <h1>こんにちは</h1>
//         <form onSubmit={handleSubmit}>
//             <label htmlFor="password">新しいパスワード</label>
//             <input type="password" id="password" onChange={(e) => setPassword(e.target.value)}/>
//             <button>送信</button>
//             <Link to="/login" className="to-login">ログインページへ</Link>
//             {errorMessage && (<p className="error-message">{errorMessage}</p>)}
//             {isSuccess && 
//             <>
//                 <p className="success-message">パスワードを更新しました！</p>
//             </>   
//             }
//         </form>
//       </>
//     )
// }