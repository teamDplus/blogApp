import '../App.css';
import BlogList from './BlogList';
import Login from './Login';

function Home() {
  return (
    <div className="App">
      <h1>blogApp</h1>
      <Login/>
      <BlogList/>
    </div>
  );
}

export default Home;
