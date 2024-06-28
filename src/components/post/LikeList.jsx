import { useParams, useNavigate, Link } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../utils/firebase";
import AppContext from "../../context/AppContext";

function LikeList() {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log(user);
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, "posts"), where("likers", "array-contains", user.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = [];
      snapshot.forEach((doc) => {
        postsData.push({ ...doc.data(), id: doc.id });
      });
      setPosts(postsData);
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  return (
    <>
      <div className="blog-list">
        <h1 className="blog-list__title">いいね一覧</h1>
        <div className="blog-list__items">
          {posts.map((post) => (
            <Link to={`/${post.authorId}/posts/${post.id}`} className="blog-list__item" key={post.id}>
              <img src={post.thumbnailUrl} className="blog-list__item-thumbnail" alt="" />
              <h3 className="blog-list__item-title">{post.title}</h3>
              <p className="blog-list__item-content">{post.content}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default LikeList;
