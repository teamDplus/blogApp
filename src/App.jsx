import './App.css';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Mypage from './components/Mypage';
import Login from './components/Login';
import Header from './components/Header';

function App() {
  return (
    <Router>
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
  );
}

export default App;
