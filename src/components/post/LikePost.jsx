import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import { db, auth } from "../../utils/firebase";
import { collection, addDoc, doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import "../../css/components/LikePost.css"

function LikePost() {
    const { user } = useContext(AppContext);
    const { id, postId } = useParams();
    const [active, setActive] = useState(false);
    const [likecount, setLikeCount] = useState();
    const [likerId, setlikerId] = useState();

    useEffect(() => {
      const fetchData = async () => {
          const postRef = doc(db, "posts", postId);
          const postSnap = await getDoc(postRef);

          if (postSnap.exists()) {
              const postData = postSnap.data();
            //   いいねデータがあれば長さ（いいね数）を取得
              setLikeCount((postData.likers || []).length || 0);
              setActive(postData.likers?.includes(user.uid) || false);
          }
      };

      if (user && postId) {
          fetchData();
      }
  }, [postId, user, likecount]);

  async function likesPosts(e) {
      e.preventDefault();

      if (!user) return;

      const postRef = doc(db, "posts", postId);
      const postSnap = await getDoc(postRef);

      if (postSnap.exists()) {
          const postData = postSnap.data();
          const isLiked = postData.likers?.includes(user.uid) || false;

          if (isLiked) {
              // いいねを解除
              await updateDoc(postRef, {
                  likeCount: postData.likeCount - 1,
                  likers: arrayRemove(user.uid)
              });
              setLikeCount(prevCount => prevCount - 1);
              setActive(false);
          } else {
              // いいねを追加
              await updateDoc(postRef, {
                  likeCount: postData.likeCount + 1,
                  likers: arrayUnion(user.uid)
              });
              setLikeCount(prevCount => prevCount + 1);
              setActive(true);
          }
      }
  } 


  return (
    
    <div className='like'>    
    {user &&
        id === user.uid ? "" :
            <button type="submit" className='like_button' onClick={likesPosts}>
        {user ? (<div className={active ? 'like_button-heart active' : 'like_button-heart'}></div>):
        (<Link to="/login"><div className='like_button-heart'></div></Link>)
        }{likecount}
        </button>
    }
    </div>
    
  )
}

export default LikePost
