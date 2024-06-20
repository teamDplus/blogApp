// components/CommentModal.jsx
import React, { useContext, useState } from "react";
import "../../css/components/CommentModal.css";
import { addDoc, collection, serverTimestamp, updateDoc, doc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useParams } from "react-router-dom";
import AppContext from "../../context/AppContext";
import { useForm } from "react-hook-form";

function Modal({ isOpen, onClose, setIsModalOpen, comment }) {
  const { user } = useContext(AppContext);
  const { postId } = useParams();
  const [isChecked, setIsChecked] = useState(false);

  // react-hook-formで使うもの
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (!isOpen) return null;

  //チェックボックスの判定
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  // react-hook-formを導入しているので、引数には、各フォームに入力した情報がわたってくる。console.log(data)で確認できる。
  const handlePostComment = async (data) => {
    //コメントを投稿された時の条件式（編集を押した際にプロップスを渡して、プロップスが存在するか、しないかで判断）
    if (!comment) {
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

        //匿名にチェックされたら
        if (isChecked) {
          await updateDoc(commentRef, {
            anonymous: true,
          });
        }

        setIsModalOpen(false); // モーダルを閉じる
      }

      //コメントを編集された時の条件式
    } else {
      if (comment) {
        const commentDoc = doc(db, "posts", postId, "comments", comment.id);

        await updateDoc(commentDoc, {
          createdAt: serverTimestamp(), // 編集日時を更新
          content: data.comment,
        });

        //匿名にチェックされたら
        if (isChecked) {
          await updateDoc(commentDoc, {
            anonymous: true,
          });
        } else {
          await updateDoc(commentDoc, {
            anonymous: false,
          });
        }

        setIsModalOpen(false); // モーダルを閉じる
      }
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
            type="text"
            defaultValue={comment ? comment.content : ""} // comment.content が存在する場合はその値、存在しない場合は空文字列を設定
          />

          <div>
            <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
            匿名
          </div>

          {errors.comment && <span className="validation-message">{errors.comment.message}</span>}
          <button className="comment-modal__button">投稿する</button>
        </form>
      </div>
    </div>
  );
}

export default Modal;
