import React, { useContext, useState } from "react";
import { db, auth } from "../utils/firebase";
import firebase from "firebase/compat/app";
import { useParams, useNavigate } from "react-router-dom";
import { collection, addDoc, doc, deleteDoc } from "firebase/firestore";
import "../css/components/Post.css";
import AppContext from "../context/AppContext";

//記事の編集が押されたら（EditPost.jsx）から情報を{EditPost}に渡してる
function Post({ EditPost }) {
  // postの内容取得
  const [title, setTitle] = useState(EditPost ? EditPost.title : ""); //EditPostが渡ってきたら「title」を入れる。なかったら「("")」
  const [content, setContent] = useState(EditPost ? EditPost.content : ""); //EditPostが渡ってきたら「content」を入れる。なかったら「("")」
  const { user, loading } = useContext(AppContext);
  const { postId } = useParams(); // URLのuserIdを取得

  const navigate = useNavigate();

  //SendPostが押されたらFirebaseの処理開始
  async function SendPost(e) {
    e.preventDefault();

    //postsに各要素を保存
    await addDoc(collection(db, "posts"), {
      authorId: user.uid,
      content: content,
      title: title,
    });

    setTitle("");
    setContent("");

    //EditPostが渡ってきたら、元々あったドキュメントを削除して再度上記のコードで登録し直す
    if (EditPost) {
      const postDoc = doc(db, "posts", postId); //ドキュメントのidを元にドキュメントを取得
      await deleteDoc(postDoc); // ドキュメントを削除
    }

    navigate("/mypage"); // "/mypage"に移動
  }

  console.log(EditPost);

  return (
    <>
      {/* EditPostから情報が渡ってきた場合（編集が押された場合の処理）*/}
      {EditPost ? (
        <>
          <div className="post">
            <h1>{EditPost ? <p>ブログを編集する</p> : <p>ブログを投稿する</p>}</h1>
            <form onSubmit={SendPost}>
              <div className="post__title">
                <input placeholder="タイトルを入れてください" type="text" onChange={(e) => setTitle(e.target.value)} value={title} />
              </div>

              <div className="post__content">
                <input placeholder="本文を入れてください" type="text" onChange={(e) => setContent(e.target.value)} value={content} />
              </div>
              <button type="submit">投稿する</button>
            </form>
          </div>
        </>
      ) : (
        // EditPostから情報が渡ってきてない場合（ブログを投稿するが押された場合の処理）
        <div className="post">
          <h1>ブログを投稿する</h1>
          <form onSubmit={SendPost}>
            <div className="post__title">
              <input placeholder="タイトルを入れてください" type="text" onChange={(e) => setTitle(e.target.value)} value={title} />
            </div>

            <div className="post__content">
              <input placeholder="本文を入れてください" type="text" onChange={(e) => setContent(e.target.value)} value={content} />
            </div>
            <button type="submit">投稿する</button>
          </form>
        </div>
      )}
    </>
  );
}

export default Post;
