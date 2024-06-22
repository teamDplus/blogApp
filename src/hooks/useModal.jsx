import { useState } from "react";

export const useModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
 // モーダルを開く関数 
 const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // モーダルを閉じる関数 
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return {
    handleOpenModal,
    handleCloseModal,
    setIsModalOpen,
    isModalOpen,
  };

}

export default useModal;