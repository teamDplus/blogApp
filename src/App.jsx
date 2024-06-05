<<<<<<< HEAD
import './App.css';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Mypage from './components/Mypage';
import Login from './components/Login';
import Header from './components/Header';
=======
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Mypage from "./components/Mypage";
import Login from "./components/Login";
import Post from "./components/Post";
>>>>>>> future/post

function App() {
  return (
    <Router>
<<<<<<< HEAD
    <div className='contents'>
      <div className='contents__header'>
        <Header/>
      </div>
      <div className='contents__app'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Mypage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  </Router>
=======
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Mypage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/:id/posts/:postId" element={<Post />} />
      </Routes>
    </Router>
>>>>>>> future/post
  );
}

export default App;
