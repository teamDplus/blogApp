import React, { useContext, useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import AppContext from "../context/AppContext";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import Post from "../components/Post";
import "../css/components/EditPost.css";

function EditPost() {
  const { id, postId } = useParams();
  const { user, loading } = useContext(AppContext);
  const [post, setPost] = useState(null);

  const handleOpenModal = async () => {
    if (post) {
      //編集ボタンを押して、再度押した場合、編集機能を非表示
      setPost(null);
    } else {
      // 編集ボタンを押したら、Firestoreからデータを取得する
      const postRef = doc(db, "posts", postId);
      const postSnap = await getDoc(postRef);
      if (postSnap.exists()) {
        setPost(postSnap.data());
      }
    }

    console.log(post);
  };

  if (!user) {
    return null;
  }


  return (
    <div>
      {/* ユーザーidとurlのidが一致したら表示 */}
      {user.uid == id ? (
        <>
          <div className="editPost">
            <p className="editPost__byebye" onClick={handleOpenModal}>
              記事を編集する
            </p>
          </div>
          {/* 編集が押されたらPost.jsxを表示させ、Firebaseから取得してきた内容を渡す */}
          {post && <Post EditPost={post} />}
        </>
      ) : // 一致しない場合何も表示させない
      null}
    </div>
  );
}

export default EditPost;
