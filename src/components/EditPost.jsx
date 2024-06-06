import React, { useContext, useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import AppContext from "../context/AppContext";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import DeleteModal from "../components/DeleteModal";
import "../css/components/EditPost.css";

function EditPost() {
  const { id, postId } = useParams();
  const { user, loading } = useContext(AppContext);
  const [post, setPost] = useState(null);

  const navigate = useNavigate();

  const handleOpenModal = async () => {
    const postRef = doc(db, "posts", postId);
    const postSnap = await getDoc(postRef);
    setPost(postSnap.data());
  };

  console.log(post);

  return (
    <div>
      {user.uid == id ? (
        <div className="editPost">
          <p className="editPost__byebye" onClick={handleOpenModal}>
            記事を編集する
          </p>
        </div>
      ) : null}
    </div>
  );
}

export default EditPost;
