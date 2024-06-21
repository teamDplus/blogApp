import { useState, useEffect } from "react";
import { useLocation, Link, useParams } from "react-router-dom";
import { db } from "../../utils/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import "../../css/components/SearchPost.css";

const SearchResults = () => {
  const { id, postId } = useParams();
  const [results, setResults] = useState([]);

  const location = useLocation();
  //検索された内容をURLから取得
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("q");

  useEffect(() => {
    const fetchResults = async () => {
      // 検索内容を元にfirebaseから該当するものを検索
      const postsRef = collection(db, "posts");
      //whereで検索条件をFirebaseにて2個設定後、下書き状態になっていないものを検索
      const q = query(postsRef, where("isDraft", "==", false), where("title", ">=", searchQuery), where("title", "<=", searchQuery + "\uf8ff"));
      const querySnapshot = await getDocs(q);
      const matchingPosts = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setResults(matchingPosts);
    };

    if (searchQuery) {
      fetchResults();
    }
  }, [searchQuery]);

  return (
    <div className="search-results">
      {/*検索内容が１件でもあれば表示 */}
      {results.length > 0 ? (
        <div className="search-list">
          <div className="search-list__items">
            {results.map((post) => (
              <Link to={`/${post.postId}/posts/${post.id}`} className="search-list__item" key={post.id}>
                <h3 className="search-list__item-title">{post.title}</h3>
                <p className="search-list__item-content">{post.content}</p>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        //検索内容がなかった場合
        <p className="search-list">該当する結果がありません。</p>
      )}
    </div>
  );
};

export default SearchResults;
