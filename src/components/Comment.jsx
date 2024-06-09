import { collection, doc, getDoc, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../utils/firebase';
import { Link, useParams } from 'react-router-dom';
import "../css/components/Comment.css";
import CommentModal from "../components/CommentModal";
import AppContext from '../context/AppContext';

export const Comment = () => {
    const [comments, setComments] = useState(null);
    const { user, loading } = useContext(AppContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { id,postId } = useParams(); 

    useEffect(() => {
        // このuseEffectの中全体で行っていることは、コメントコレクションの情報と、それに紐づくusersコレクションの情報の取得
        const fetchComments = async () => {
            const commentRef = collection(db, "posts", postId, "comments");
            const q = query(commentRef, orderBy("createdAt", "desc"));
            onSnapshot(q, async (querySnapshot) => {
                const commentsData = await Promise.all(querySnapshot.docs.map(async (docData) => {
                    // まずは、コメントコレクションの情報を取得。cosole.log(commentData)で確認できる。
                    const commentData = docData.data();
                    // 続いて、コメントコレクション内のauthorIdに紐づくusersコレクションの情報を取得。cosole.log(userSnap)で確認できる。
                    const userRef = doc(db, "users", commentData.authorId);
                    const userSnap = await getDoc(userRef);
                    if (userSnap.exists()) {
                        return {
                            ...commentData,
                            userId: userSnap.data().userId,
                            userName: userSnap.data().nickName ? userSnap.data().nickName : userSnap.data().userId
                        };
                    } else {
                        return {
                            ...commentData,
                            userName: "Unknown User"
                        };
                    }
                }));
                setComments(commentsData);
            });
        };

        fetchComments();
    }, [postId]);

      if (!comments) {
        return <div>Loading...</div>;
      }
        
        // モーダルを開く関数 「コメントを書く」を押すと発動
        const handleOpenModal = () => {
        setIsModalOpen(true);
        };

        // モーダルを閉じる関数 CommentModal.jsxの閉じるが押されたら発動
        const handleCloseModal = () => {
        setIsModalOpen(false);
        };

    console.log(id)
  return (
    <div className="comment">
        <h3 className="comment__title">コメント</h3>
        <div className="comment-list">
          {comments && comments.map((comment) => (
            <div className="comment-list__item">
              <div className="comment-list__item-head">
                <p className="comment-user">{comment.userName}</p>
                <p className="comment-date">{comment.createdAt ?  comment.createdAt.toDate().toLocaleString() : ""}</p>
              </div>
              <p className="comment-list__item-content">{comment.content}</p>
            </div>
          ))}
        </div>
        {/* ログインしているユーザーのidと、今見ている記事のユーザーのidが一致すれば、「コメントを書く」ボタンを非表示にする。 */}
        {user &&
            id === user.uid 
                ?
            ""
                :
            <button className='comment-post' onClick={handleOpenModal}>
            <img className='comment-post__img' src="../../commentIcon.svg" alt="" />
            {/*ログインしていない時に「コメントを書く」ボタンを押すと、ログイン画面に遷移させる。  */}
            {user 
                ? 
            (<p className='comment-post__text'>コメントを書く</p>)
                :
            (<Link to="/login" className='comment-post__text'>コメントを書く</Link>)
            }
            </button>
        }
         {/* 「コメントを書く」を押すと、CommentModalコンポーネントが表示される。 */}
         {isModalOpen 
            && 
         <CommentModal isOpen={isModalOpen} onClose={handleCloseModal} setIsModalOpen={setIsModalOpen} />
        
         }
      </div>
  )
}
