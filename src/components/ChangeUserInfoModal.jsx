import { useState } from 'react';
import CheckNewUserInfo from './CheckNewUserInfo';

//ユーザ情報を変更するモーダル
const ChangeUserInfoModal = ({ isSetModalOpen, nickName, onSetModalClose, userId, setDisplayName, setTextNoNickName }) => {
  const [newNickName, setNewNickName] = useState('');
  const [isCheckModalOpen, setIsCheckModalOpen] = useState(false);

  //「変更」ボタンを押したときに確認用のモーダルに切り替える
  const openCheckModal = (e) => {
    e.preventDefault();
    onSetModalClose();
    setIsCheckModalOpen(true);
  };
  // 確認用モーダルを閉じる
  const closeCheckModal = () => {
    setIsCheckModalOpen(false);
  };

  return (
    <>
      {isSetModalOpen && (
        <div className="changeUserInfo modal">
          <div className="modal__content">
            <h2 className='changeUserInfo__title'>ユーザ情報の変更</h2>
            <form onSubmit={openCheckModal}>
              <div className="changeUserInfo__nickName">
                <label htmlFor="nickName" className="">ニックネーム</label>
                <input onChange={(e) => setNewNickName(e.target.value)} type="nickName" name="nickName" id="nickName" className="" placeholder={nickName} required="" />
              </div>
              <button type="submit" className="changeUserInfo__button">変更</button>

            </form>
          </div>
        </div>
      )}
      <CheckNewUserInfo
        isCheckModalOpen={isCheckModalOpen}
        newNickName={newNickName}
        onCheckModalClose={closeCheckModal}
        userId={userId}
        setDisplayName={setDisplayName}
        setTextNoNickName={setTextNoNickName}
      />
    </>
  );
}
export default ChangeUserInfoModal;