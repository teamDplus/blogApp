import React, { useContext, useState } from "react";
import "../css/components/Header.css";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";
import { HeaderButton } from "./HeaderButton";
import { FollowButton } from "./follow/FollowButton";

const Header = () => {
  const { user, followerCount,followingCount } = useContext(AppContext);

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
            <HeaderButton icon={"/homeIcon.svg"} text="マイページ" link={user ? `/${user.uid}` : "/login"}/>
            <HeaderButton icon={"/postIcon.svg"} text="ブログを投稿する" link={user ? `/${user.uid}/post` : "/login"}/>
            <HeaderButton icon={"/draftsIcon.png"} text="下書き一覧" link={user ? `/${user.uid}/drafts` : "/login"}/>
            <HeaderButton icon={"/likes.svg"} text="いいね！履歴" link={user ? `/${user.uid}/likes` : "/login"}/>
            <HeaderButton icon={"/peopleIcon.svg"} text="みんなの投稿" link={"/"}/>
        </div>
        <div className="header__follows">
          {user && (
            <>
              <FollowButton link={`/${user.uid}/followings`} text={`${followingCount}フォロー`} className={"header__follow"}/>
              <FollowButton link={`/${user.uid}/followers`} text={`${followerCount}フォロワー`} className={"header__follower"}/>
            </>
          )}
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
