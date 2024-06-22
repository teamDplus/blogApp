import { collection, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../utils/firebase";
import CommentModal from "./modal/CommentModal";
import useModal from "../hooks/useModal";

function CommentEdit({ comment }) {
  const {
    handleOpenModal,
    handleCloseModal,
    setIsModalOpen,
    isModalOpen,
  } = useModal();
 

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
