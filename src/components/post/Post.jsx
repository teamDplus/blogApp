import React, { useContext, useState, useEffect } from "react";
import { db, auth } from "../../utils/firebase";
import firebase from "firebase/compat/app";
import { useParams, useNavigate } from "react-router-dom";
import { collection, addDoc, doc, deleteDoc, setDoc, query, where, onSnapshot, serverTimestamp, updateDoc, getDoc } from "firebase/firestore";
import "../../css/components/Post.css";
import AppContext from "../../context/AppContext";
import InputImage from "../image/InputImage";
import { SetThumbnail } from "../image/SetThumbnail";
import usePost from "../../hooks/usePost";

//記事の編集が押されたら（EditPost.jsx）から情報を{EditPost}に渡してる
function Post({ EditPost }) {
  const {
    title,
    setTitle,
    content,
    setContent,
    fileObject,
    setFileObject,
    newProfilePicture,
    saveDraft,
    SendPost,
    setNewProfilePicture,
    contentLength,
  } = usePost({EditPost})



  return (
    <>
      <div className="post">
        <h1>{EditPost ? <p>ブログを編集する</p> : <p>ブログを投稿する</p>}</h1>
        <form onSubmit={SendPost}>
          <div className="post__thumbnail">
            <InputImage
              imageLabel={"サムネイルの変更"}
              fileObject={fileObject}
              setFileObject={setFileObject}
              setNewProfilePicture={setNewProfilePicture}
              newProfilePicture={newProfilePicture}
            />
          </div>
          <div className="post__title">
            <p>タイトル(40字以内)</p>
            <input
              placeholder="タイトルを入れてください"
              type="text"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              value={title}
              maxLength={40}
            />
          </div>

          <div className="post__content">
            <p>本文(100字以上400字以内)</p>
            <textarea
              placeholder="本文を入れてください"
              type="text"
              onChange={(e) => {
                setContent(e.target.value);
              }}
              value={content}
              maxLength={400}
            />
          </div>

          <div className="post__button">
            <button type="submit" disabled={contentLength}>
              投稿する
            </button>
            <button type="button" onClick={saveDraft}>
              {EditPost ? "下書きに移動する" : "下書き保存する"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Post;
