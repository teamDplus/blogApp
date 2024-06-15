import React, { useContext, useEffect, useState } from 'react';
import "../../css/components/Followers.css";
import { db } from '../../utils/firebase';
import { collection, doc, getDoc, onSnapshot, orderBy, query } from 'firebase/firestore';
import AppContext from '../../context/AppContext';
import { Link } from 'react-router-dom';

export const Followers = () => {
    const { user } = useContext(AppContext);
    const [users, setUsers] = useState()

    useEffect(() => {
     // useEffectの中全体でやっていることとしては、followersコレクションのfollowersIdから、そのユーザーの情報を取得
     const fetchComments = async () => {
        const followRef = collection(db,"users",user.uid,"followers");
        const q = query(followRef, orderBy("followedAt", "desc"));
        onSnapshot(q, async (querySnapshot) => {
            const followersData = await Promise.all(querySnapshot.docs.map(async (docData) => {
                // まずは、followersコレクションの情報を取得。cosole.log(followerData)で確認できる。
                const followerData = docData.data();
                // 続いて、followersコレクション内のfollowersIdに紐づくusersコレクションの情報を取得。cosole.log(userSnap)で確認できる。
                const userRef = doc(db, "users", followerData.followerId);
                const userSnap = await getDoc(userRef);
                if (userSnap.exists()) {
                    return {
                        ...followerData,
                        userId: userSnap.data().userId,
                        userName: userSnap.data().nickName ? userSnap.data().nickName : userSnap.data().userId,
                        profilePictureUrl: userSnap.data().profilePictureUrl,
                    };
                } else {
                    return {
                        ...followerData,
                        userName: "Unknown User"
                    };
                }
            }));
            setUsers(followersData);
        });
    };

    fetchComments();
    },[])
console.log(users)
  return (
    <div>
        <div className='follower'>
            <h1>フォロワー一覧</h1>
            <div className='follower__users'>
                {users && users.length > 0 ? (
                    users.map((user) => (
                        <Link to={`/${user.userId}`} className='follower__user'>
                            <img src={user.profilePictureUrl} alt="" />
                            <p>{user.userName}</p>
                        </Link>
                    ))
                ) : (
                    <p>フォロワーはいません</p>
                )}
            </div>
        </div>
    </div>
  )
}
