import React, { useContext, useEffect, useState } from "react";
import { auth } from "../../utils/firebase";
import AppContext from "../../context/AppContext";
import { useParams, useNavigate } from "react-router-dom";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import DeleteModal from "../modal/DeleteModal";
import "../../css/components/DeletePost.css";

function DeletePost() {
  const { id, postId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, loading } = useContext(AppContext);

  const navigate = useNavigate();

  // モーダルを開く関数 記事が削除されるが押されたら発動
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // モーダルを閉じる関数 Modal.jsxのいいえが押されたら発動
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    const postDoc = doc(db, "posts", postId);

    await deleteDoc(postDoc); // ドキュメントを削除
    setIsModalOpen(false); // モーダルを閉じる
    navigate("/mypage"); // "/mypage"に移動
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
