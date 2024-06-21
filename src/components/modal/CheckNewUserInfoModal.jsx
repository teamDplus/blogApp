import { collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { UploadImageToStorage } from "../image/UploadImageToStorage";
import { useState } from "react";

//変更内容を確認するモーダル
const CheckNewUserInfoModal = (props) => {
  const {
    isCheckModalOpen, //確認用のモーダルを開く
    onCheckModalClose,  //確認用のモーダルを閉じる
    userId, //ユーザ固有のid
    newNickName, //変更後のニックネーム
    setNickName, //現在のニックネーム
    fileObject, //アップロードした画像情報
    newProfilePicture, //変更後のプロフィール画像
    setDisplayName, //表示名の設定(ニックネーム、ユーザ名、ユーザidどれを表示するか)
    setTextNoNickName, //ニックネームの設定を促すメッセージ
    setProfilePicture, //プロフィール画面の設定
    setNewProfilePicture, //変更後のプロフィール画像の設定
    setNewNickName //変更後のニックネームの設定
  } = props;

  // isCheckModalOpenがtrueのときのみ確認用モーダルを表示
  if (!isCheckModalOpen) return null;
  //「はい」を押した場合、ユーザ情報を変更する
  const changeUserInfo = async () => {
    const oldUserInfo = query(collection(db, 'users'), where('userId', '==', userId));
    const querySnapshot = await getDocs(oldUserInfo);

    querySnapshot.forEach(async (doc) => {
      //入力された情報のみ保存し、データを更新する
      const updates = {};

      //新しいニックネームが入力された場合
      if (newNickName !== undefined && newNickName.trim() !== '') {
        updates.nickName = newNickName;
        //マイページの表示を更新
        setNickName(newNickName);
        setDisplayName(newNickName);
        setTextNoNickName(false);
      }
      //新しいプロフィール画像が入力された場合
      let profilePictureStorageUrl = newProfilePicture;
      if (fileObject) {
        //ストレージ保存先のパスを指定
        const storageFilePath = "profileImages/" + userId + "/";
        //ストレージに画像を保存、URLを取得する（非同期処理でアップロード完了を待つ）
        profilePictureStorageUrl = await UploadImageToStorage(fileObject, storageFilePath);
        //プロフィール画像を変更の対象とする
        updates.profilePictureUrl = profilePictureStorageUrl;
        //マイページの表示を更新
        setProfilePicture(profilePictureStorageUrl);
      }

      //update[]に保存された値のみデータベースを更新する
      if (Object.keys(updates).length > 0) {
        await updateDoc(doc.ref, updates);
      };
    });
    // モーダルを閉じる
    onCheckModalClose();
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
        <p><strong>プロフィール画像:</strong> <img src={newProfilePicture} alt="" className="changeUserInfoModal__profilePicture" /></p>
        <button onClick={changeUserInfo} className="modal__button--yes">はい</button>
        <button onClick={closeSetUserInfo} className="modal__button--no">いいえ</button>
      </div>
    </div>
  );
};
export default CheckNewUserInfoModal;