import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import { db, auth } from "../../utils/firebase";
import { collection, addDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import "../../css/components/LikePost.css"

function LikePost() {
    const { user } = useContext(AppContext);
    const { id, postId } = useParams();
    const [active, setActive] = useState(false);
    const [likecount, setCount] = useState(0);

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
                    userName: userSnap.data().nickName ? userSnap.data().nickName : userSnap.data().userId,
                    profilePictureUrl: userSnap.data().profilePictureUrl,
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


    async function likesPosts(e) {
      setActive(!likeCount);
        e.preventDefault();
        await updateDoc(doc(db, "posts", postId), {
          likeCount: true,
        });
        // if (beforeIsLiked) {
        //   likecount = likesPosts ? count : count - 1;
        // } else {
        //   likecount = likesPosts ? count + 1 : count;
        // }
        {setCount(likesPosts ? likecount+1 : likecount-1)}
      }


      console.log(likecount)

  return (
    
    <div className='like'>    
    {user &&
        id === user.uid ? "" :
            <button type="submit" className='like_button' onClick={likesPosts}>
        {user ? (<div className={likecount ? 'like_button-heart active' : 'like_button-heart'}></div>):
        (<Link to="/login"><div className='like_button-heart'></div></Link>)
        }
        </button>
    }
    </div>
    
  )
}

export default LikePost
