import React, { useEffect, useState } from "react";
import "../../css/components/BlogList.css";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { Link } from "react-router-dom";
import { SortPosts } from "./SortPosts";

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  //ソート
  const [selectedSortType, setSelectedSortType] = useState('new');


  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "posts"), (snapshot) => {
      const postsData = [];
      snapshot.forEach((doc) => {
        postsData.push({ ...doc.data(), id: doc.id });
      });

      //ソート
      const sortedPosts = [...postsData].sort((a, b) => {
        //新しい順
        // 隣接するpostData（a,b）のcreatedAt比較し、新しい投稿であれば前に配置、古ければ後ろに配置
        if (selectedSortType === "new") {
          if (a.createdAt > b.createdAt) return -1;
          if (a.createdAt < b.createdAt) return 1;
          return 0;
        }
        //古い順
        else {
          if (a.createdAt > b.createdAt) return 1;
          if (a.createdAt < b.createdAt) return -1;
          return 0;
        }
      });

      console.log(postsData);
      setPosts(sortedPosts);
    });

    return () => {
      unsubscribe();
    };
  }, [selectedSortType]);
  console.log(posts);
  return (
    <div className="blog-list">
      <h2 className="blog-list__title">ブログ一覧</h2>
      <div className="blog-list__sort">
        <SortPosts
          selectedSortType={selectedSortType}
          setSelectedSortType={setSelectedSortType}
        />
      </div>
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
