import { collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../utils/firebase";

//変更内容を確認するモーダル
const CheckNewUserInfo = ({ isCheckModalOpen, newNickName, onCheckModalClose, userId, setDisplayName, setTextNoNickName }) => {
  // isCheckModalOpenがtrueのときのみ確認用モーダルを表示
  if (!isCheckModalOpen) return null;

  //「はい」を押した場合、ユーザ情報を変更する
  const changeUserInfo = async() => {
    const oldUserInfo = query(collection(db, 'users'), where('userId', '==', userId));
    const querySnapshot = await getDocs(oldUserInfo);
    querySnapshot.forEach(async (doc) => {
      await updateDoc(doc.ref, {
        nickName: newNickName,
      });
    });
    // モーダルを閉じる
    onCheckModalClose();
    //displayNameのuseStateを更新して画面の表示も切り替える
    setDisplayName(newNickName);
    //textNoNickNameのuseStateを更新
    setTextNoNickName(false);
  };

  //「いいえ」を押した場合、ユーザ情報の変更を行わない
  const closeSetUserInfo = () => {
    onCheckModalClose();
  };

  return (
    <div className="checkNewUserInfo modal">
      <div className="checkNewUserInfo__content modal__content">
        <h2 className="checkNewUserInfo__title">変更内容の確認</h2>
        <p>以下の情報で変更しますか？</p>
        <p><strong>ニックネーム:</strong> {newNickName}</p>
        <button onClick={changeUserInfo} className="modal__button--yes">はい</button>
        <button onClick={closeSetUserInfo} className="modal__button--no">いいえ</button>
      </div>
    </div>
  );
};
export default CheckNewUserInfo;