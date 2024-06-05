import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Mypage from "./components/Mypage";
import Login from "./components/Login";
import Post from "./components/Post";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Mypage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/:id/posts/:postId" element={<Post />} />
      </Routes>
    </Router>
  );
}

export default App;
