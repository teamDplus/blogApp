import { useContext } from 'react';
import '../../App.css';
import BlogList from '../post/BlogList';
import Login from './Login';
import AppContext from '../../context/AppContext';

function Home() {
  const {user} = useContext(AppContext);

  console.log(user)
  return (
    <div className="App">
      <BlogList/>
    </div>
  );
}

export default Home;
