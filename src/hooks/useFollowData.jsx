import { useState, useEffect, useContext } from 'react';
import { collection, doc, getDoc, onSnapshot, orderBy, query } from 'firebase/firestore';
import AppContext from '../context/AppContext';
import { db } from '../utils/firebase';

const useFollowData = (followType) => {
    const { user } = useContext(AppContext);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchFollowData = async () => {
            const followRef = collection(db, "users", user.uid, followType);
            const q = query(followRef, orderBy("followedAt", "desc"));
            onSnapshot(q, async (querySnapshot) => {
                const followData = await Promise.all(querySnapshot.docs.map(async (docData) => {
                    const data = docData.data();
                    const userRef = doc(db, "users", data[`${followType === "following" ? "followingId" : "followerId"}`]);
                    const userSnap = await getDoc(userRef);
                    if (userSnap.exists()) {
                        return {
                            ...data,
                            userId: userSnap.data().userId,
                            userName: userSnap.data().nickName ? userSnap.data().nickName : userSnap.data().userId,
                            profilePictureUrl: userSnap.data().profilePictureUrl,
                        };
                    } else {
                        return {
                            ...data,
                            userName: "Unknown User"
                        };
                    }
                }));
                setUsers(followData);
            });
        };

        fetchFollowData();
    }, [followType, user.uid]);

    return users;
};

export default useFollowData;
