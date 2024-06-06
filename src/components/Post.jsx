import React, { useContext, useState } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import { db,auth } from '../utils/firebase';
import firebase from "firebase/compat/app";
import '../css/components/Post.css';
import { collection, addDoc } from "firebase/firestore";
import AppContext from '../context/AppContext';

function Post() {
  // postの内容取得
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const {user,loading} = useContext(AppContext);
  const Navigator = useNavigate();
  async function SendPost(e) {
    e.preventDefault();

    await addDoc(collection(db, "posts"), {
      authorId:user.uid,
      content:content,
      title:title,
    });

    setTitle("");
    setContent("");
    Navigator("/:id");
  }
  console.log(db)
  return (
    <div className='post'>
      <h1>ブログを投稿する</h1>
      <form onSubmit={SendPost}>
          <input placeholder="タイトルを入れてください" type='text' onChange={(e) => setTitle(e.target.value)} value={title} />
        <div className="post__title">
        </div>

        <div className="post__content">
          <input placeholder="本文を入れてください" type='text' onChange={(e) => setContent(e.target.value)} value={content} />
        </div>
      <button type='submit'>投稿する</button>
      </form>

    </div>
    );
  }

export default Post