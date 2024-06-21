// 各必要な要素を取得
import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import "../../css/components/Mypage.css";
import { auth } from "../../utils/firebase";
import AppContext from "../../context/AppContext";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../utils/firebase";
import GetUserInfo from "../login/GetUserInfo";

//ログイン情報の取得
const BlogDrafts = () => {
  const { user, loading } = useContext(AppContext);
  const { id, postId } = useParams();
  // Firebaseから取得した内容をpostsに代入
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  // ログアウトが押された際の挙動
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("サインアウトしました。");
        navigate(`/`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Firebaseの中にあるpostsのフィールドから、ユーザーの投稿記事を取得
  useEffect(() => {
    // postsの中にあるコレクションの中からフィールドのauthorIdとログインしているuserと同じidの記事を取得後
    // isDraftがtrueになっているもの「下書き保存」されたものを表示
    const q = query(collection(db, "posts"), where("authorId", "==", user.uid), where("isDraft", "==", true));

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
      {user.uid == id ? (
        <div className="mypage">
          <h1 className="mypage__title">下書き</h1>
          <GetUserInfo />
          <button onClick={handleSignOut} className="logout">
            ログアウト
          </button>

          <div className="mypage-list">
            <h2>下書き一覧</h2>
            <div className="mypage-list__items">
              {posts.map((post) => (
                <div key={post.id}>
                  <Link to={`/${user.uid}/posts/${post.id}`} className="mypage-list__link">
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
      ) : // 一致しない場合何も表示させない
        null}
    </>
  );
};

export default BlogDrafts;
