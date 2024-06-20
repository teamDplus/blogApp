import React from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../utils/firebase";

function CommentDelete({ comment, user, postId }) {
  console.log(comment);

  const commentDelete = async () => {
    if (comment.userId == user.uid) {
      const commentDoc = doc(db, "posts", postId, "comments", comment.id);
      console.log(commentDoc);
      await deleteDoc(commentDoc); // コメントを削除
    }
  };

  return (
    <p className="comment-list__item-delete" onClick={commentDelete}>
      削除する
    </p>
  );
}

export default CommentDelete;
