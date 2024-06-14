import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../../utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import DeletePost from "./DeletePost";
import EditPost from "./EditPost";
import LinkPost from "./LinkPost";
import "../../css/components/PostList.css";
import "../../css/components/Post.css";
import { Comment } from "../Comment";

function Post() {
  //App.jsxのpostIdに設定したURLを取得、<Route path="/:id/posts/:postId"
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      // postsコレクションの中の指定されたpostIdのドキュメントを取得
      const postRef = doc(db, "posts", postId);
      const postSnap = await getDoc(postRef);

      if (postSnap.exists()) {
        setPost(postSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchPost();
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="post-list">
        <div className="post-list__item">
          <h3 className="post-list__item-title">{post.title}</h3>
          <p className="post-list__item-content">{post.content}</p>
        </div>
      </div>
      {/* <div className="post-list__menu"> */}
      <DeletePost />
      <LinkPost />
      <EditPost />
      {/* </div> */}
      <Comment />
    </>
  );
}

export default Post;
