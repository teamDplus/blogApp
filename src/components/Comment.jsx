import { collection, doc, getDoc, onSnapshot, orderBy, query, deleteDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { Link, useParams } from "react-router-dom";
import "../css/components/Comment.css";
import CommentModal from "./modal/CommentModal";
import CommentDelete from "./CommentDelete";
import CommentEdit from "./CommentEdit";
import AppContext from "../context/AppContext";
import useModal from "../hooks/useModal";

export const Comment = () => {
  const [comments, setComments] = useState(null);
  const { user, loading } = useContext(AppContext);
  const { id, postId } = useParams();
  const {
    handleOpenModal,
    handleCloseModal,
    setIsModalOpen,
    isModalOpen,
  } = useModal();

  useEffect(() => {
    // このuseEffectの中全体で行っていることは、コメントコレクションの情報と、それに紐づくusersコレクションの情報の取得
    const fetchComments = async () => {
      const commentRef = collection(db, "posts", postId, "comments");
      const q = query(commentRef, orderBy("createdAt", "desc"));
      onSnapshot(q, async (querySnapshot) => {
        const commentsData = await Promise.all(
          querySnapshot.docs.map(async (docData) => {
            // まずは、コメントコレクションの情報を取得。cosole.log(commentData)で確認できる。
            const commentData = docData.data();
            // 続いて、コメントコレクション内のauthorIdに紐づくusersコレクションの情報を取得。cosole.log(userSnap)で確認できる。
            const userRef = doc(db, "users", commentData.authorId);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
              return {
                ...commentData,
                userId: userSnap.data().userId,
                userName: userSnap.data().nickName ? userSnap.data().nickName : userSnap.data().userId,
                profilePictureUrl: userSnap.data().profilePictureUrl,
              };
            } else {
              return {
                ...commentData,
                userName: "Unknown User",
              };
            }
          })
        );
        setComments(commentsData);
      });
    };

    fetchComments();
  }, [postId]);

  if (!comments) {
    return <div>Loading...</div>;
  }

  return (
    <div className="comment">
      <h3 className="comment__title">コメント</h3>
      <div className="comment-list">
        {comments &&
          comments.map((comment) => (
            <div className="comment-list__item" key={comment.id}>
              {user ? (
                //ログインしている場合
                comment.anonymous02 && id == user.uid ? (
                  /* 投稿者のみに表示にした場合 */
                  <>
                    <div className="comment-list__item-head">
                      <Link to={`/${comment.userId}`} className="comment-user">
                        <img className="comment-user__img" src={comment.profilePictureUrl} alt="" />
                        {/* 匿名じゃない場合と匿名の場合の処理 */}
                        {comment.anonymous ? <p className="comment-user__name">名前は秘密だよ</p> : <p className="comment-user__name">{comment.userName}</p>}
                      </Link>
                      <p className="comment-date">{comment.createdAt ? comment.createdAt.toDate().toLocaleString() : ""}</p>
                    </div>
                    <p className="comment-list__item-content">{comment.content}</p>
                  </>
                ) : !comment.anonymous02 ? (
                  /* 投稿者のみに表示にしてない場合 */
                  <>
                    <div className="comment-list__item-head">
                      <Link to={`/${comment.userId}`} className="comment-user">
                        <img className="comment-user__img" src={comment.profilePictureUrl} alt="" />
                        {/* 匿名じゃない場合と匿名の場合の処理 */}
                        {comment.anonymous ? <p className="comment-user__name">名前は秘密だよ</p> : <p className="comment-user__name">{comment.userName}</p>}
                      </Link>
                      <p className="comment-date">{comment.createdAt ? comment.createdAt.toDate().toLocaleString() : ""}</p>
                    </div>
                    <p className="comment-list__item-content">{comment.content}</p>
                  </>
                ) : null
              ) : (
                <>
                  {/* //ログインしていない場合 */}
                  {!comment.anonymous02 ? (
                    <>
                      <div className="comment-list__item-head">
                        <Link to={`/${comment.userId}`} className="comment-user">
                          <img className="comment-user__img" src={comment.profilePictureUrl} alt="User Profile" />
                          {/* Display user's name or anonymous message */}
                          {comment.anonymous ? <p className="comment-user__name">名前は秘密だよ</p> : <p className="comment-user__name">{comment.userName}</p>}
                        </Link>
                        <p className="comment-date">{comment.createdAt ? new Date(comment.createdAt).toLocaleString() : ""}</p>
                      </div>
                      <p className="comment-list__item-content">{comment.content}</p>
                    </>
                  ) : null}
                </>
              )}

              {/* 自分がコメントした内容のみ削除、編集できる */}
              {user ? (
                <div className="comment-list__menu">
                  {user.uid == comment.userId ? <CommentDelete comment={comment} user={user} postId={postId} /> : null}
                  {user.uid == comment.userId ? <CommentEdit comment={comment} user={user} postId={postId} /> : null}
                </div>
              ) : null}
            </div>
          ))}
      </div>
      {/* ログインしているユーザーのidと、今見ている記事のユーザーのidが一致すれば、「コメントを書く」ボタンを非表示にする。 */}
      {user && (
        <button className="comment-post" onClick={handleOpenModal}>
          <img className="comment-post__img" src="../../commentIcon.svg" alt="" />
          {/*ログインしていない時に「コメントを書く」ボタンを押すと、ログイン画面に遷移させる。  */}
          {user ? (
            <p className="comment-post__text">コメントを書く</p>
          ) : (
            <Link to="/login" className="comment-post__text">
              コメントを書く
            </Link>
          )}
        </button>
      )}
      {/* 「コメントを書く」を押すと、CommentModalコンポーネントが表示される。 */}
      {isModalOpen && <CommentModal isOpen={isModalOpen} onClose={handleCloseModal} setIsModalOpen={setIsModalOpen} />}
    </div>
  );
};
