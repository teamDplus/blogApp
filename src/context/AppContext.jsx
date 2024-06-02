"use client";

import { onAuthStateChanged } from 'firebase/auth';
import React, {  useState ,createContext, useEffect} from 'react';
import { auth } from '../utils/firebase';


const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [user,setUser] = useState(null);
    const [userName,setUserName] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (newUser) => {
            setUser(newUser);

        
        });
        return () => {
            unsubscribe();
        };
    },[])

return (
  <AppContext.Provider value={{user,setUser,userName,setUserName}}>
    {children}  
  </AppContext.Provider>
)
}



export default AppContext