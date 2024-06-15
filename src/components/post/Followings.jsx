import React, { useContext, useEffect, useState } from 'react';
import "../../css/components/Followings.css";
import { db } from '../../utils/firebase';
import { collection, doc, getDoc, onSnapshot, orderBy, query } from 'firebase/firestore';
import AppContext from '../../context/AppContext';

export const Followings = () => {
    const { user } = useContext(AppContext);
    const [users, setUsers] = useState()

    useEffect(() => {
     // このuseEffectの中全体で行っていることは、コメントコレクションの情報と、それに紐づくusersコレクションの情報の取得
     const fetchComments = async () => {
        const followRef = collection(db,"users",user.uid,"following");
        const q = query(followRef, orderBy("followedAt", "desc"));
        onSnapshot(q, async (querySnapshot) => {
            const followsData = await Promise.all(querySnapshot.docs.map(async (docData) => {
                // まずは、コメントコレクションの情報を取得。cosole.log(followData)で確認できる。
                const followData = docData.data();
                // 続いて、コメントコレクション内のauthorIdに紐づくusersコレクションの情報を取得。cosole.log(userSnap)で確認できる。
                const userRef = doc(db, "users", followData.followingId);
                const userSnap = await getDoc(userRef);
                if (userSnap.exists()) {
                    return {
                        ...followData,
                        userId: userSnap.data().userId,
                        userName: userSnap.data().nickName ? userSnap.data().nickName : userSnap.data().userId,
                        profilePictureUrl: userSnap.data().profilePictureUrl,
                    };
                } else {
                    return {
                        ...followData,
                        userName: "Unknown User"
                    };
                }
            }));
            setUsers(followsData);
        });
    };

    fetchComments();
    },[])
console.log(users)
  return (
    <div>
        <div className='follow'>
            <h1>フォロー一覧</h1>
            <div className='follow__users'>
                {users && users.map((user) => (
                    <p>{user.userName}</p>
                ))}
            </div>
        </div>
    </div>
  )
}
