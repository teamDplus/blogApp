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
