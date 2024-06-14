import { useState } from 'react';
import CheckNewUserInfoModal from './CheckNewUserInfoModal';
import UploadImage from "../login/UploadImage";
import { useForm } from "react-hook-form";

//ユーザ情報を変更するモーダル
const ChangeUserInfoModal = (props) => {
  const {
    isSetModalOpen, //設定用のモーダルを開く
    onSetModalClose, //設定用のモーダルを閉じる
    userId, //ユーザ固有のid
    nickName, //
    setNickName, //現在のニックネーム
    setDisplayName, //表示名の設定(ニックネーム、ユーザ名、ユーザidどれを表示するか)
    setTextNoNickName, //ニックネームの設定を促すメッセージ
    setProfilePicture, //プロフィール画面の設定
  } = props;

  const [newNickName, setNewNickName] = useState(''); //変更後のニックネーム
  const [newProfilePicture, setNewProfilePicture] = useState(''); //変更後のプロフィール画像
  const [isCheckModalOpen, setIsCheckModalOpen] = useState(false);  //確認用のモーダルを開く
  const [fileObject, setFileObject] = useState(null);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm()

  //「変更」ボタンを押したときに確認用のモーダルに切り替える
  const openCheckModal = () => {
    setNewNickName(getValues().nickname); // フォームの値から新しいニックネームを取得して設定
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
            <form onSubmit={handleSubmit(openCheckModal)}>
              <div className="changeUserInfo__nickName">
                <label htmlFor="nickName" className="">ニックネーム</label>
                <input
                  onChange={(e) => setNewNickName(e.target.value)}
                  type="text"
                  name="nickName"
                  id="nickName"
                  className=""
                  placeholder={nickName}
                  {...register('nickname', {
                    minLength: {
                      value: 3,
                      message: '3文字以上10文字以内で入力してください'
                    },
                    maxLength: {
                      value: 10,
                      message: '3文字以上10文字以内で入力してください'
                    },
                  })}
                />
                {errors.nickname && <span className="validation-message">{errors.nickname.message}</span>}
              </div>
              <UploadImage
                setNewProfilePicture={setNewProfilePicture}
                newProfilePicture={newProfilePicture}
                setFileObject={setFileObject}
                fileObject={fileObject}
                userId={userId}
              />
              <button type="submit" className="changeUserInfo__button">変更</button>
            </form>
          </div>
        </div>
      )}
      <CheckNewUserInfoModal
        isCheckModalOpen={isCheckModalOpen}
        onCheckModalClose={closeCheckModal}
        userId={userId}
        newNickName={newNickName}
        newProfilePicture={newProfilePicture}
        setNickName={setNickName}
        setDisplayName={setDisplayName}
        setTextNoNickName={setTextNoNickName}
        setProfilePicture={setProfilePicture}
        setNewProfilePicture={setNewProfilePicture}
        setNewNickName={setNewNickName}
        fileObject={fileObject}
      />
    </>
  );
}
export default ChangeUserInfoModal;