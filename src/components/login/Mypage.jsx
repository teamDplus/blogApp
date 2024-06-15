// 各必要な要素を取得
import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import "../../css/components/Mypage.css";
import { auth } from "../../utils/firebase";
import AppContext from "../../context/AppContext";
import { collection, query, where, onSnapshot, serverTimestamp, doc, addDoc, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import GetUserInfo from "./GetUserInfo";

//ログイン情報の取得
const Mypage = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { user, loading } = useContext(AppContext);
  // Firebaseから取得した内容をpostsに代入
  const [posts, setPosts] = useState([]);
  const [isFollowing, setIsFollowing] = useState();

  useEffect(() => {
    console.log(user);
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
    // postsの中にあるコレクションの中からフィールドのauthorIdとログインしているuserと同じidの記事を取得
    //postsの中にあるisDraftがfalseを取得(公開済みの記事)
    const q = query(collection(db, "posts"), where("authorId", "==", id), where("isDraft", "==", false));

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
  }, [user,id]);

  useEffect(() => {
    const checkFollowing = async () => {
        const followingRef = collection(db, "users", user.uid, "following");
        const q = query(followingRef, where("followingId", "==", id));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            setIsFollowing(true);
        } else {
            setIsFollowing(false);
        }
    };

    checkFollowing();
}, [user, id, isFollowing]);

  const handleFollow = async(e) => {
    e.preventDefault();
    
    const followingRef = collection(db, "users", user.uid, "following");
    await addDoc(followingRef, {
      followingId: id,
      followedAt: serverTimestamp()
    });
    
    setIsFollowing(true);
    alert("フォローしました！");
  }

  const handleUnfollow = async(e) => {
    e.preventDefault();

    const followingRef = collection(db, "users", user.uid, "following");
    const q = query(followingRef, where("followingId", "==", id));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      querySnapshot.forEach(async (docSnapshot) => {
          const docRef = doc(db, "users", user.uid, "following", docSnapshot.id);
          await deleteDoc(docRef);
      });
    }else{

    }
    setIsFollowing(false)
    alert("フォロー解除しました！")
  }

  return (
    <div className="mypage">
      <h1 className="mypage__title">マイページ</h1>
      {user && user.uid === id 
        ? 
        <>
          <GetUserInfo />
            <button onClick={handleSignOut} className="logout">
              ログアウト
            </button>
        </>
        :
        ""
      }
 
      {isFollowing 
        ? 
        <button onClick={handleUnfollow}>フォロー解除</button>
        :
        <button onClick={handleFollow}>フォローする</button>
    }
      <div className="mypage-list">
        <h2>ブログ一覧</h2>
        <div className="mypage-list__items">
          {posts.map((post) => (
            <div key={post.id}>
              <Link to={`/${id}/posts/${post.id}`} className="mypage-list__link">
                <div className="mypage-list__item">
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
