"use client";

import { onAuthStateChanged } from 'firebase/auth';
import React, {  useState ,createContext, useEffect} from 'react';
import { auth } from '../utils/firebase';


const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [user,setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (newUser) => {
            setUser(newUser);
            setLoading(false); // 非同期処理の完了を示す
        
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