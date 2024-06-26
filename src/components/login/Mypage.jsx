// 各必要な要素を取得
import { signOut } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import "../../css/components/Mypage.css";
import { auth } from "../../utils/firebase";
import AppContext from "../../context/AppContext";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../utils/firebase";
import GetUserInfo from "./GetUserInfo";
import { SortPosts } from "../post/SortPosts";
import { Follow } from "../follow/Follow";
import sortPosts  from "../../utils/sortPosts";
import useLogout from "../../hooks/useLogout";

//ログイン情報の取得
const Mypage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading } = useContext(AppContext);
  // Firebaseから取得した内容をpostsに代入
  const [posts, setPosts] = useState([]);
  //ソート
  const [selectedSortType, setSelectedSortType] = useState('new');
  const {handleSignOut} = useLogout();

 


  // Firebaseの中にあるpostsのフィールドから、ユーザーの投稿記事を取得
  useEffect(() => {
    // postsの中にあるコレクションの中からフィールドのauthorIdとログインしているuserと同じidの記事を取得
    //postsの中にあるisDraftがfalseを取得(公開済みの記事)
    const q = query(collection(db, "posts"), where("authorId", "==", id), where("isDraft", "==", false));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = [];
      snapshot.forEach((doc) => {
        postsData.push({ ...doc.data(), id: doc.id });
      });
      // ソート
      setPosts(sortPosts(postsData, selectedSortType));

    });

    return () => {
      unsubscribe();
    };
  }, [user, id, selectedSortType]);



  return (
    <div className="mypage">
      {user && user.uid === id ? (
        <>
          <h1 className="mypage__title">マイページ</h1>
          <GetUserInfo />
          <button onClick={handleSignOut} className="logout">
            ログアウト
          </button>
        </>
      ) : (
        <GetUserInfo />
      )
      }
      {user && (
        <Follow />
      )}
      <div className="mypage-list">
        <h2>ブログ一覧</h2>
        <div className="mypage--sort">
          <SortPosts
            selectedSortType={selectedSortType}
            setSelectedSortType={setSelectedSortType}
          />
        </div>
        <div className="mypage-list__items">
          {posts.map((post) => (
            <div key={post.id}>
              <Link to={`/${id}/posts/${post.id}`} className="mypage-list__link">
                <div className="mypage-list__item">
                  <img src={post.thumbnailUrl} className="mypage-list__item-thumbnail" alt="" />
                  <h3 className="mypage-list__item-title">{post.title}</h3>
                  <p className="mypage-list__item-content">{post.content}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mypage;
