// components/Modal.js
import React, { useContext, useState } from "react";
import "../css/components/CommentModal.css";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useNavigate, useParams } from "react-router-dom";
import AppContext from "../context/AppContext";
import { useForm } from "react-hook-form";

function Modal({ isOpen, onClose,setIsModalOpen }) {
    const { user, loading } = useContext(AppContext);
    const { postId } = useParams();
    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm()
    if (!isOpen) return null;

const handlePostComment = async (data) => {
    const commentRef = collection(db, "posts", postId, "comments");
    await addDoc(commentRef, {
        authorId: user.uid,
        content: data.comment,
        createdAt:serverTimestamp(),
      });
    setIsModalOpen(false); // モーダルを閉じる
};



  return (
    <div className="comment-modal">
      <div className="comment-modal__content">
        <button className="comment-modal__close" onClick={onClose}>閉じる</button>
        <p className="comment-modal__title">コメント投稿</p>
        <form className="comment-modal__form" onSubmit={handleSubmit(handlePostComment)}>
            <textarea 
                className="comment-modal__textarea"
                {...register('comment', {
                    required: '必須入力',
                    minLength: {
                    value: 10,
                    message: '10文字以上200文字以内で入力してください'
                    },
                    maxLength: {
                    value: 200,
                    message: '10文字以上200文字以内で入力してください'
                    },
                })}>
            </textarea>
            {errors.comment && <span className="validation-message">{errors.comment.message}</span>}
            <button className="comment-modal__button">投稿する</button>
        </form>
      </div>
    </div>
  );
}

export default Modal;
