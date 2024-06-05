import { onAuthStateChanged } from 'firebase/auth';
import React, {  useState ,createContext, useEffect} from 'react';
import { auth, db } from '../utils/firebase';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';


const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [user,setUser] = useState(null);
    const [loading, setLoading] = useState(true);

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
                profilePictureUrl:newUser.photoURL && newUser.photoURL,
                createdAt:serverTimestamp()
              });
            }
          }
            setUser(newUser);
            console.log(newUser)
            setLoading(false); // 非同期処理の完了を示す
        console.log(loading)
        });
        return () => {
            unsubscribe();
        };
    },[])
    // loadingがtrueの間は子コンポーネントのレンダリングを待つ
    if (loading) {
      return null; 
    }else if(!loading){
      return (
        <AppContext.Provider value={{user,setUser,loading}}>
          {children}  
        </AppContext.Provider>
      )
    }

}



export default AppContext