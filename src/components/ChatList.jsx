import React, { useContext, useEffect, useState } from "react";
import AppContext from '../context/AppContext';
import { useParams } from 'react-router-dom';
import { db } from '../utils/firebase';

function ChatList() {
    const { user } = useContext(AppContext);
    const { id } = useParams();

    const chat = async(e) => {
        e.preventDefault();
        alert("フォローしました！");
        <link rel="${userId}/chat/"/>
      }

  return (
    <div>
        {user && user.uid === id ? ("") : <button onClick={chat}>チャット</button>}
    </div>
  )
}

export default ChatList
