import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Mypage from "./components/Mypage";
import Login from "./components/Login";
import Header from "./components/Header";
import Signup from "./components/Signup";
import PostList from "./components/PostList";
import Post from "./components/Post";
import { ResetPassword } from "./components/ResetPassword";
import { ForgotPassword } from "./components/ForgotPassword";
import { SentPassword } from "./components/SentPassword";

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
          </Routes>
        </div>
      </div>

    </Router>
  );
}

export default App;
