import { useContext } from 'react';
import '../App.css';
import BlogList from './BlogList';
import Login from './Login';
import AppContext from '../context/AppContext';

function Home() {
  const {user} = useContext(AppContext);

  console.log(user)
  return (
    <div className="App">
      <h1>blogApp</h1>
      <Login/>
      <BlogList/>
    </div>
  );
}

export default Home;
