import React from "react";

function CommentCheck({ text, isChecked, setIsChecked }) {
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // チェックボックスの状態を反転させる
  };

  return (
    <label>
      <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
      {text}
    </label>
  );
}

export default CommentCheck;
