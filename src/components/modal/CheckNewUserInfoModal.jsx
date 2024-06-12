import { collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";



//変更内容を確認するモーダル
const CheckNewUserInfoModal = ( props ) => {
  const {
    isCheckModalOpen, //確認用のモーダルを開く
    onCheckModalClose,  //確認用のモーダルを閉じる
    userId, //ユーザ固有のid
    newNickName, //変更後のニックネーム
    newProfilePicture, //変更後のプロフィール画像
    setNickName, //現在のニックネーム
    setDisplayName, //表示名の設定(ニックネーム、ユーザ名、ユーザidどれを表示するか)
    setTextNoNickName, //ニックネームの設定を促すメッセージ
    setProfilePicture //プロフィール画面の設定
  } = props;

  // isCheckModalOpenがtrueのときのみ確認用モーダルを表示
  if (!isCheckModalOpen) return null;

  //「はい」を押した場合、ユーザ情報を変更する
  const changeUserInfo = async() => {
    const oldUserInfo = query(collection(db, 'users'), where('userId', '==', userId));
    const querySnapshot = await getDocs(oldUserInfo);
    querySnapshot.forEach(async (doc) => {
      const updates = {};

      // 空欄でない場合に updates オブジェクトに値を追加
      if (newNickName !== undefined || newNickName !== '') {
        updates.nickName = newNickName;
      }
    
      if (newProfilePicture !== undefined || newProfilePicture !== '') {
        updates.profilePictureUrl = newProfilePicture;
      }

      if (Object.keys(updates).length > 0) {
        await updateDoc(doc.ref, updates);
      };
    
    });
    // モーダルを閉じる
    onCheckModalClose();
    setNickName(newNickName);
    //displayNameのuseStateを更新して画面の表示も切り替える
    setDisplayName(newNickName);
    //textNoNickNameのuseStateを更新
    setTextNoNickName(false);
    //profilePictureを更新して画面の表示も切り替える
    setProfilePicture(newProfilePicture);
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
        <p><strong>プロフィール画像:</strong> <img src={newProfilePicture} alt="" /></p>
        <button onClick={changeUserInfo} className="modal__button--yes">はい</button>
        <button onClick={closeSetUserInfo} className="modal__button--no">いいえ</button>
      </div>
    </div>
  );
};
export default CheckNewUserInfoModal;