import React, { useContext, useEffect, useState } from "react";
import { addDoc, collection, doc, gaddDoc } from 'firebase/firestore';
import AppContext from '../context/AppContext';
import { useParams } from 'react-router-dom';
import { db,auth } from '../utils/firebase';

function Chat() {
    const { userId } = useParams();
    const [user] = useAuthState(auth);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    function sendMessage(e) {
      e.preventDefault();
  
      const {uid, photoURL} = auth.currentUser
  
      await addDoc(postRef, {
        message: message
    });
      setMessage("");
    }
      
    const [massages, setMessages] = useState([]);
    useEffect(() => {
      db.collection("messages").orderBy("createdAt").limit(50).onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
      });
    }, []);

  return (
    <div>
        aaaa
     {massages.map(({id, text, photoURL, uid}) => (
        <div>
            <div key={id} className={`msg ${uid === auth.currentUser.uid ? "sent" : "received"}`}>
                <img src={photoURL} alt="" />
                <p>{text}</p>
            </div>
        </div>
    ))}
          <form onSubmit={sendMessage}>
        <div className="sendMsg">
          <input
           placeholder="メッセージを入力してください" type='text' onChange={(e) => setMessage(e.target.value)} value={message} />
        </div>
      </form>
    </div>
  )
}

export default Chat
