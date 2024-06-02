import React, { useEffect, useState } from 'react'
import "../css/components/BlogList.css"
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../utils/firebase';

const BlogList = () => {
    const [posts,setPosts] = useState([]);
    
    useEffect(() => {
        const unsubscribe  = onSnapshot(collection(db, "posts"), (snapshot) => {
            const postsData  = []
            snapshot.forEach((doc) => {
                postsData.push({ ...doc.data(), id: doc.id });
            })
            console.log(postsData);
            setPosts(postsData)
        });
        
        return () => {
            unsubscribe();
        }
    },[])

  return (
    <div>
        <h2>ブログ一覧</h2>
        {posts.map((post) => (
            <div className='blog' key={post.id}>
                <h3>タイトル：{post.title}</h3>
                <p>記事の内容：{post.content}</p>
            </div>
        ))}
    </div>
  )
}

export default BlogList