import React, { useContext, useState } from "react";
import "../css/components/Header.css";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";

const Header = () => {
  const { user, loading } = useContext(AppContext);

  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  //検索ご、遷移先のURLに検索内容をいれ、遷移させる
  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  return (
    <div className="header">
      <div className="header__inner">
        <Link to="/" className="header__top">HOME</Link>
        <div className="header__links">
          <Link to={user ? `/${user.uid}` : "/login"} className="header__button">
            <div className="header__button-img">
              <img src="./homeIcon.svg" alt="" />
            </div>
            <p className="header__button-text">マイページ</p>
          </Link>
          <Link to={user ? `/${user.uid}/post` : "/login"} className="header__button">
            <div className="header__button-img">
              <img src="./postIcon.svg" alt="" />
            </div>
            <p className="header__button-text">ブログを投稿する</p>
          </Link>
          <Link to={user ? `/${user.uid}/drafts` : "/login"} className="header__button">
            <div className="header__button-img">
              <img src="./draftsIcon.png" alt="" />
            </div>
            <p className="header__button-text">下書き一覧</p>
          </Link>
          <Link to={user ? `/${user.uid}/likes` : "/login"} className="header__button">
            <div className="header__button-img">
              <img src="./likes.svg" alt="" />
            </div>
            <p className="header__button-text">いいね！履歴</p>
          </Link>
          <Link to={user ? `/${user.uid}/followings` : "/login"} className="header__button">
            <div className="header__button-img">
              <img src="./followingIcon.png" alt="" />
            </div>
            <p className="header__button-text">フォロー一覧</p>
          </Link>
          <Link to="/" className="header__button">
            <div className="header__button-img">
              <img src="./peopleIcon.svg" alt="" />
            </div>
            <p className="header__button-text">みんなの投稿</p>
          </Link>
        </div>
      </div>
      {/* 検索機能 */}
      <div className="header__search">
        <input type="text" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyPress={handleSearch} />
      </div>
    </div>
  );
};

export default Header;
