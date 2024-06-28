import React, { useEffect, useState } from "react";
import "../../css/components/BlogList.css";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { Link } from "react-router-dom";
import sortPosts  from "../../utils/sortPosts";
import { SortPosts } from "./SortPosts";

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  //ソート
  const [selectedSortType, setSelectedSortType] = useState('new');


  useEffect(() => {
    // postsの中にあるコレクションの中からフィールドのauthorIdとログインしているuserと同じidの記事を取得
    //postsの中にあるisDraftがfalseを取得(公開済みの記事)
    const q = query(collection(db, "posts"), where("isDraft", "==", false));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = [];
      snapshot.forEach((doc) => {
        postsData.push({ ...doc.data(), id: doc.id });
      });

      //ソート
      setPosts(sortPosts(postsData, selectedSortType));

    });

    return () => {
      unsubscribe();
    };
  }, [selectedSortType]);
  console.log(posts);
  return (
    <div className="blog-list">
      <h1 className="blog-list__title">ブログ一覧</h1>
      <div className="blog-list__sort">
        <SortPosts
          selectedSortType={selectedSortType}
          setSelectedSortType={setSelectedSortType}
        />
      </div>
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
  );
};

export default BlogList;
