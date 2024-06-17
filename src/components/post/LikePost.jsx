import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import { db, auth } from "../../utils/firebase";
import { collection, addDoc, doc, deleteDoc, setDoc } from "firebase/firestore";
import "../../css/components/LikePost.css"

function LikePost() {
    const { user } = useContext(AppContext);
    const { id } = useParams();
    const [active, setActive] = useState(false);
    const [count, setCount] = useState(0);
    // const { likeCount } = useParams([false]);

    async function likesPosts(e) {
      setActive(!active);
        e.preventDefault();
        await addDoc(collection(db, "posts"), {
          likeCount: true,
        });
        {setCount(likesPosts ? count+1 : count-1)}
      }

      console.log(count)

  return (
    
    <div className='like'>    
    {user &&
        id === user.uid ? "" :
            <button type="submit" className='like_button' onClick={likesPosts}>
        {user ? (<div className={active ? 'like_button-heart active' : 'like_button-heart'}></div>):
        (<Link to="/login"><div className='like_button-heart'></div></Link>)
        }
        </button>
    }
    </div>
    
  )
}

export default LikePost
