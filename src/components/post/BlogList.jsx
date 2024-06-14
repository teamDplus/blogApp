import React, { useContext, useEffect, useState } from "react";
import "../../css/components/BlogList.css";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { Link } from "react-router-dom";
import AppContext from "../../context/AppContext";

const BlogList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "posts"), (snapshot) => {
      const postsData = [];
      snapshot.forEach((doc) => {
        postsData.push({ ...doc.data(), id: doc.id });
      });
      console.log(postsData);
      setPosts(postsData);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  console.log(posts);
  return (
    <div className="blog-list">
      <h2 className="blog-list__title">ブログ一覧</h2>
      <div className="blog-list__items">
        {posts.map((post) => (
          <Link to={`/${post.authorId}/posts/${post.id}`} className="blog-list__item" key={post.id}>
            <h3 className="blog-list__item-title">{post.title}</h3>
            <p className="blog-list__item-content">{post.content}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
