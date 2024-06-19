// components/CommentModal.jsx
import React, { useContext } from "react";
import "../../css/components/CommentModal.css";
import { addDoc, collection, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useParams } from "react-router-dom";
import AppContext from "../../context/AppContext";
import { useForm } from "react-hook-form";

function Modal({ isOpen, onClose, setIsModalOpen }) {
  const { user } = useContext(AppContext);
  const { postId } = useParams();
  // react-hook-formで使うもの
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (!isOpen) return null;

  // react-hook-formを導入しているので、引数には、各フォームに入力した情報がわたってくる。console.log(data)で確認できる。
  const handlePostComment = async (data) => {
    if (user && user.uid) {
      // console.log(data)
      const commentRef = await addDoc(collection(db, "posts", postId, "comments"), {
        authorId: user.uid,
        content: data.comment,
        createdAt: serverTimestamp(),
      });

      // 取得したドキュメントIDをフィールドとして更新
      await updateDoc(commentRef, {
        id: commentRef.id,
      });

      setIsModalOpen(false); // モーダルを閉じる
    }
  };

  return (
    // react-hook-formライブラリをインストールして、バリデーションを適用
    <div className="comment-modal">
      <div className="comment-modal__content">
        <button className="comment-modal__close" onClick={onClose}>
          閉じる
        </button>
        <p className="comment-modal__title">コメント投稿</p>
        <form className="comment-modal__form" onSubmit={handleSubmit(handlePostComment)}>
          <textarea
            className="comment-modal__textarea"
            {...register("comment", {
              required: "必須入力",
              minLength: {
                value: 10,
                message: "10文字以上200文字以内で入力してください",
              },
              maxLength: {
                value: 200,
                message: "10文字以上200文字以内で入力してください",
              },
            })}
          ></textarea>
          {errors.comment && <span className="validation-message">{errors.comment.message}</span>}
          <button className="comment-modal__button">投稿する</button>
        </form>
      </div>
    </div>
  );
}

export default Modal;
