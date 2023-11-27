import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Createpost from './pages/Createpost';
import Viewpost from './pages/Viewpost';
import Login from './components/Login';
import Register from './components/Register';
import Auth from './pages/Auth';

function App() {
  return (
    <>
      <Router>
        <Link to="/">Home</Link>
        <Link to="/Createpost">Create a post</Link>
        <Link to="/auth">Login</Link>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Createpost" element={<Createpost />} />
          <Route path="/post/:id" element={<Viewpost />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/register" element={<Register/>}/>

        </Routes>
      </Router>
      
    </>
  );
}

export default App;
