import { collection, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../utils/firebase";
import CommentModal from "./modal/CommentModal";

function CommentEdit({ comment }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // モーダルを開く関数 「コメントを書く」を押すと発動
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // モーダルを閉じる関数 CommentModal.jsxの閉じるが押されたら発動
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <p className="comment-list__item-edit" onClick={handleOpenModal}>
        編集する
      </p>

      {isModalOpen && <CommentModal comment={comment} isOpen={isModalOpen} onClose={handleCloseModal} setIsModalOpen={setIsModalOpen} />}
    </>
  );
}

export default CommentEdit;
