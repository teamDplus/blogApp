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
    const { postId } = useParams(); 

    useEffect(() => {
        const fetchComments = async () => {
            const commentRef = collection(db, "posts", postId, "comments");
            const q = query(commentRef, orderBy("createdAt", "desc"));
            onSnapshot(q, async (querySnapshot) => {
                const commentsData = await Promise.all(querySnapshot.docs.map(async (docData) => {
                    const commentData = docData.data();
                    const userRef = doc(db, "users", commentData.authorId);
                    const userSnap = await getDoc(userRef);
                    console.log(userSnap.data().nickName)
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
        
  // モーダルを開く関数 記事が削除されるが押されたら発動
        const handleOpenModal = () => {
        setIsModalOpen(true);
        };

        // モーダルを閉じる関数 Modal.jsxのいいえが押されたら発動
        const handleCloseModal = () => {
        setIsModalOpen(false);
        };

    console.log(comments)
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
        <button className='comment-post' onClick={handleOpenModal}>
          <img className='comment-post__img' src="../../commentIcon.svg" alt="" />
          {user 
            ? 
          (<p className='comment-post__text'>コメントを書く</p>)
            :
          (<Link to="/login" className='comment-post__text'>コメントを書く</Link>)
        }
          
        </button>
         {/* 編集が押されたらPost.jsxを表示させ、Firebaseから取得してきた内容を渡す */}
         {isModalOpen 
            && 
         <CommentModal isOpen={isModalOpen} onClose={handleCloseModal} setIsModalOpen={setIsModalOpen} />
        
         }
      </div>
  )
}
