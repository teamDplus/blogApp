import React, { useContext, useState, useEffect } from "react";
import { db, auth } from "../../utils/firebase";
import firebase from "firebase/compat/app";
import { useParams, useNavigate } from "react-router-dom";
import { collection, addDoc, doc, deleteDoc, setDoc, query, where, onSnapshot, serverTimestamp, updateDoc, getDoc } from "firebase/firestore";
import "../../css/components/Post.css";
import AppContext from "../../context/AppContext";
import InputImage from "../image/InputImage";
import { UploadImageToStorage } from "../image/UploadImageToStorage";

//記事の編集が押されたら（EditPost.jsx）から情報を{EditPost}に渡してる
function Post({ EditPost }) {
  const [title, setTitle] = useState(EditPost ? EditPost.title : ""); //EditPostが渡ってきたら「title」を入れる。なかったら「("")」
  const [content, setContent] = useState(EditPost ? EditPost.content : ""); //EditPostが渡ってきたら「content」を入れる。なかったら「("")」
  const { user, loading } = useContext(AppContext);
  const { id, postId } = useParams(); // URLのuserIdを取得
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [fileObject, setFileObject] = useState(null);
  const [newProfilePicture, setNewProfilePicture] = useState(''); //変更後のプロフィール画像
  let docRef = "";
  const [thumbnailStorageUrl, setThumbnailStorageUrl] = useState('');
  const defaultThumbnailUrl = "https://firebasestorage.googleapis.com/v0/b/blogapp-c1052.appspot.com/o/postImages%2Fdefault%2FnoImage.PNG?alt=media&token=c7febf2c-b45e-4469-b1ce-2b232f8bd56d"

  // Firebaseの中にあるpostsのフィールドから、ユーザーの投稿記事を取得
  useEffect(() => {
    // postsの中にあるコレクションの中からフィールドのauthorIdとログインしているuserと同じidの記事を取得
    //postsの中にあるisDraftがfalseを取得(公開済みの記事)
    const q = query(collection(db, "posts"), where("authorId", "==", id), where("isDraft", "==", true));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = [];
      snapshot.forEach((doc) => {
        postsData.push({ ...doc.data(), id: doc.id });
      });
      setPosts(postsData);
    });

    return () => {
      unsubscribe();
    };
  }, [user, id]);

  // 投稿画面で下書き保存ボタンを押したら発火
  async function swicthisDraft(e) {
    e.preventDefault();
    // 下書きの数は５個までの制限
    if (posts.length <= 4) {
      // isDraftで下書きに切り替え
      docRef = await addDoc(collection(db, "posts"), {
        isDraft: true,
        authorId: user.uid,
        content: content,
        title: title,
      });
      navigate(`/${id}/drafts`);
    } else {
      alert("下書きに保存できるのは5個までです。");
    }

    setThumbnail(); //サムネイル画像の設定
  }

  // 編集画面で下書き移動ボタンを押したら発火
  async function editisDraft(e) {
    // 下書きの数は５個までの制限
    if (posts.length <= 4) {
      e.preventDefault();
      // isDraftで下書きに切り替え
      docRef = doc(db, "posts", postId);
      await updateDoc(docRef, {
        isDraft: true,
        authorId: user.uid,
        content: content,
        title: title,
      });
      navigate(`/${id}/drafts`);
    } else {
      alert("下書きに保存できるのは5個までです。");
    }
  }

  // 100字以上になると投稿ボタンが押せるようになる
  const contentLength = content.length < 100;

  //SendPostが押されたらFirebaseの処理開始
  async function SendPost(e) {
    e.preventDefault();
    //postsに各要素を保存
    //新規投稿
    if (postId === undefined) {
      docRef = await addDoc(collection(db, "posts"), {
        isDraft: false,
        authorId: user.uid,
        content: content,
        title: title,
        createdAt: serverTimestamp(),
      });
    }
    //編集後に再度投稿
    else {
      docRef = doc(db, "posts", postId);
      // ドキュメントを取得してcreatedAtが存在するか確認
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        const updateData = {
          isDraft: false,
          authorId: user.uid,
          content: content,
          title: title,
        };

        // createdAtが存在しない場合は追加
        //※最初の投稿画面で下書きに保存した場合、createdAtが保存されないため必要
        if (!data.createdAt) {
          updateData.createdAt = serverTimestamp();
        }

        await updateDoc(docRef, updateData);
      }
    }

    setThumbnail(); //サムネイル画像の設定
    setTitle("");
    setContent("");
    navigate(`/${user.uid}`); // "/mypage"に移動
  }

  //サムネイル画像の設定
  const setThumbnail = async () => {
    let thumbnailStorageUrl = "";
    //サムネイル画像が選択された場合
    if (fileObject) {
      //ストレージ保存先のパスを指定
      const storageFilePath = "postImages/" + docRef.id + "/thumbnail/";
      //ストレージに画像を保存、URLを取得する（非同期処理でアップロード完了を待つ）
      thumbnailStorageUrl = await UploadImageToStorage(fileObject, storageFilePath);
    }
    //選択されていない場合
    else {
      // ドキュメントを取得してthumbnailUrlが存在するか確認
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        // thumbnailUrlが既に存在する場合は処理を抜ける
        //下書きから投稿する際にdefaultThumbnailUrlに変更されてしまうため
        if (data.thumbnailUrl) {
          return
        }
      }

      //NO IMAGE画像を設定
      thumbnailStorageUrl = defaultThumbnailUrl;
    }
    // ドキュメントの参照を取得し、thumbnailUrlを追加
    const postDocRef = doc(db, "posts", docRef.id);
    //ポストのstorageにサムネイル画像のurlを追加する
    await updateDoc(postDocRef, {
      thumbnailUrl: thumbnailStorageUrl,
    });
  }

  return (
    <>
      {/* EditPostから情報が渡ってきた場合（編集が押された場合の処理）*/}
      {EditPost ? (
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
                <button type="button" onClick={editisDraft}>
                  {EditPost ? "下書きに移動する" : "下書き保存する"}
                </button>
              </div>
            </form>
          </div>
        </>
      ) : (
        // EditPostから情報が渡ってきてない場合（ブログを投稿するが押された場合の処理）
        <div className="post">
          <h1>ブログを投稿する</h1>
          <form onSubmit={SendPost}>
            <div className="post__thumbnail">
              <InputImage
                imageLabel={"サムネイルの設定"}
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
              <button type="button" onClick={swicthisDraft}>
                {EditPost ? "下書きに移動する" : "下書き保存する"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default Post;
