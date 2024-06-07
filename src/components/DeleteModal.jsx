// components/Modal.js
import React from "react";
import "../css/components/DeleteModal.css";

function Modal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="deleteModal">
      <div className="deleteModal__content">
        <p>本当に削除しますか？</p>
        <button onClick={onConfirm}>はい</button>
        <button onClick={onClose}>いいえ</button>
      </div>
    </div>
  );
}

export default Modal;
