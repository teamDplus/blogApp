import { addDoc, collection, deleteDoc, doc, getDocs, query, serverTimestamp, where } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../../utils/firebase';
import AppContext from '../../context/AppContext';
import { useParams } from 'react-router-dom';

export const Follow = () => {
    const { user, loading } = useContext(AppContext);
    const { id } = useParams(); 
    const [isFollowing, setIsFollowing] = useState();

// 現在訪れているユーザーをフォローしているかチェック
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

// フォローボタンの処理
  const handleFollow = async(e) => {
    e.preventDefault();
    
    const followingRef = collection(db, "users", user.uid, "following");
    await addDoc(followingRef, {
      followingId: id,
      followedAt: serverTimestamp()
    });

    const followerRef = collection(db, "users", id, "followers");
    await addDoc(followerRef, {
        followerId: user.uid,
        followedAt: serverTimestamp()
      });
    setIsFollowing(true);
    alert("フォローしました！");
  }

  // フォロー解除ボタンの処理
  const handleUnfollow = async(e) => {
    e.preventDefault();
// まずはクエリで、現在見ているユーザーページのパラムを取得し、それをもとにフォローしているユーザーのドキュメントを取得
    const followingRef = collection(db, "users", user.uid, "following");
    const followerRef = collection(db, "users", id, "followers");
    const followingQuery = query(followingRef, where("followingId", "==", id));
    const followerQuery = query(followerRef, where("followerId", "==", id));
    const followingQuerySnapshot = await getDocs(followingQuery);
    const followerQuerySnapshot = await getDocs(followerQuery);
// ユーザーが存在していたら、そのドキュメントを削除
if (!followingQuerySnapshot.empty ) {
    followingQuerySnapshot.forEach(async (docSnapshot) => {
          const docRef = doc(db, "users", user.uid, "following", docSnapshot.id);
          await deleteDoc(docRef);
      });
      followerQuerySnapshot.forEach(async (docSnapshot) => {
          const docRef = doc(db, "users", id, "followers", docSnapshot.id);
          await deleteDoc(docRef);
      });
    }else{

    }
    setIsFollowing(false)
    alert("フォロー解除しました！")
  }
  console.log(isFollowing)
  return (
    <div>
        {/* 現在訪れているユーザーをフォローしているかどうかでボタンが変わる */}
      {isFollowing 
        ? 
        <button onClick={handleUnfollow}>フォロー解除</button>
        :
        <button onClick={handleFollow}>フォローする</button>
    }
    </div>
  )
}
