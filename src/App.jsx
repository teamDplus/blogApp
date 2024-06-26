import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/login/Home";
import Mypage from "./components/login/Mypage";
import Login from "./components/login/Login";
import Header from "./components/Header";
import Signup from "./components/login/Signup";
import PostList from "./components/post/PostList";
import Post from "./components/post/Post";
import Draft from "./components/post/BlogDrafts";
import SearchPost from "./components/post/SearchPost";
import { ResetPassword } from "./components/login/ResetPassword";
import { ForgotPassword } from "./components/login/ForgotPassword";
import { SentPassword } from "./components/login/SentPassword";
import LikeList from "./components/post/LikeList";
import { Followers } from "./components/follow/Followers";
import { Followings } from "./components/follow/Followings";
import  ChatList  from "./components/ChatList";
import  Chat  from "./components/Chat";

function App() {
  return (
    <Router>
      <div className="contents">
        <div className="contents__header">
          <Header />
        </div>
        <div className="contents__app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<Mypage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/:id/posts/:postId" element={<PostList />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/:id/post" element={<Post />} />
            <Route path="/reset_password" element={<ResetPassword />} />
            <Route path="/password_sent" element={<SentPassword />} />
            <Route path="/forgot_password" element={<ForgotPassword />} />
            <Route path="/:id/drafts" element={<Draft />} />
            <Route path="/:id/likes" element={<LikeList />} />
            <Route path="/search" element={<SearchPost />} />
            <Route path="/:id/followings" element={<Followings />} />
            <Route path="/:id/followers" element={<Followers />} />
            <Route path="/:id/chatlist" element={<ChatList />} />
            <Route path="/:id/chat" element={<Chat />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
