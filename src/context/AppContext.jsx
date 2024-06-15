import { onAuthStateChanged } from 'firebase/auth';
import React, {  useState ,createContext, useEffect} from 'react';
import { auth, db } from '../utils/firebase';
import { collection, doc, getCountFromServer, getDoc, getDocs, serverTimestamp, setDoc } from 'firebase/firestore';


const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [user,setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [followerCount, setFollowerCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const defaultProfilePictureUrl = "https://firebasestorage.googleapis.com/v0/b/blogapp-c1052.appspot.com/o/profileImages%2Fdefault%2FprofilePicture_default.svg?alt=media&token=41401a2c-009b-44fa-9219-9b7c3f599de0"

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (newUser) => {
          setLoading(true); // 非同期処理の開始を示す
          if (newUser) {
            // Firestore にユーザーデータを保存
            const userDocRef = doc(db, 'users', newUser.uid);
            const userDocSnapshot = await getDoc(userDocRef);
            if (!userDocSnapshot.exists()){
              await setDoc(userDocRef, {
                userId: newUser.uid,
                email: newUser.email,
                name: newUser.displayName,
                nickName: newUser.displayName,
                profilePictureUrl:newUser.photoURL || defaultProfilePictureUrl,
                createdAt:serverTimestamp()
              });
            }
            fetchCounts(newUser.uid);
          }
            setUser(newUser);
            setLoading(false); // 非同期処理の完了を示す
        });

        return () => {
          unsubscribe();
        };
      },[])
      
      const fetchCounts = async (userId) => {
        if (userId) {
            // フォロー数を取得
            const followingsRef = collection(db, "users", userId, "following");
            const followingsSnapshot = await getCountFromServer(followingsRef);
            const followingsCount = followingsSnapshot.data().count;
            setFollowingCount(followingsCount);

            // フォロワー数を取得
            const followersRef = collection(db, "users", userId, "followers");
            const followersSnapshot = await getCountFromServer(followersRef)
            const followersCount = followersSnapshot.data().count;
            setFollowerCount(followersCount);
        }
    };
    // loadingがtrueの間は子コンポーネントのレンダリングを待つ
    if (loading) {
      return null; 
    }else if(!loading){
      return (
        <AppContext.Provider value={{user,setUser,loading,followerCount,followingCount}}>
          {children}  
        </AppContext.Provider>
      )
    }

}



export default AppContext