import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../../utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import BlogList from "./BlogList.jsx";

function LikeList() {
    // const { postId } = useParams();
    // const [post, setPost] = useState(null);
   

  
    return (
      <>
    <div className="blog-list">
        <h2 className='blog-list__title'>いいね一覧</h2>
        <div className="blog-list__items">
            {/* {posts.map((post) => (
                <Link to={`/${post.authorId}/posts/${post.id}`} className="blog-list__item" key={post.id}>
                    <h3 className="blog-list__item-title">{post.title}</h3>
                    <p className="blog-list__item-content">{post.content}</p>
                </Link>
            ))} */}
        </div>
    </div>
      </>
    );
  }
  

export default LikeList
