// components/Modal.js
import React, { useContext, useState } from "react";
import "../css/components/DeleteModal.css";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useNavigate, useParams } from "react-router-dom";
import AppContext from "../context/AppContext";

function Modal({ isOpen, onClose,setIsModalOpen }) {
    const { user, loading } = useContext(AppContext);
    const { postId } = useParams();
    const [content,setContent] = useState()
    if (!isOpen) return null;

const handlePostComment = async (e) => {
    e.preventDefault(); 
    const commentRef = collection(db, "posts", postId, "comments");
    await addDoc(commentRef, {
        authorId: user.uid,
        content: content,
        createdAt:serverTimestamp(),
      });
    setIsModalOpen(false); // モーダルを閉じる
};



  return (
    <div className="deleteModal">
      <div className="deleteModal__content">
        <p>コメント投稿</p>
        <button onClick={onClose}>閉じる</button>
        <form onSubmit={handlePostComment}>
            <textarea onChange={(e) => setContent(e.target.value)}></textarea>
            <button>投稿する</button>
        </form>
      </div>
    </div>
  );
}

export default Modal;
