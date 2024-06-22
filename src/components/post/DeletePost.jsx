import React, { useContext, useEffect, useState } from "react";
import { auth } from "../../utils/firebase";
import AppContext from "../../context/AppContext";
import { useParams, useNavigate } from "react-router-dom";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import DeleteModal from "../modal/DeleteModal";
import "../../css/components/DeletePost.css";
import useModal from "../../hooks/useModal";

function DeletePost() {
  const { id, postId } = useParams();
  const { user, loading } = useContext(AppContext);
  const {
    handleOpenModal,
    handleCloseModal,
    setIsModalOpen,
    isModalOpen,
  } = useModal();

  const navigate = useNavigate();


  const handleConfirmDelete = async () => {
    const postDoc = doc(db, "posts", postId);

    await deleteDoc(postDoc); // ドキュメントを削除
    setIsModalOpen(false); // モーダルを閉じる
    navigate(`/${user.uid}`); // "/mypage"に移動
  };

  return (
    <div>
      {user && user.uid == id ? (
        <div className="deletePost">
          <p className="deletePost__byebye" onClick={handleOpenModal}>
            記事を削除する
          </p>
          <DeleteModal isOpen={isModalOpen} onClose={handleCloseModal} onConfirm={handleConfirmDelete} />
        </div>
      ) : null}
    </div>
  );
}

export default DeletePost;
