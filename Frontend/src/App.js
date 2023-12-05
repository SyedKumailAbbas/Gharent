import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import Postform from "./components/Postform";
import Fullpost from "./components/Fullpost";
import Post from "./components/Post";
import Register from "./components/Register";
import Login from './components/Login'
import { AuthContext } from "./Helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./components/Sidebar";
function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          Token: localStorage.getItem("Token"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("Token");
    setAuthState({ username: " ", id: 0, status: false });
  };

  return (
    <div >
      <div>
        <AuthContext.Provider value={{ authState, setAuthState }}>
          <Router>
            <nav  >
              <button onClick={toggleSidebar} className="text-white focus:outline-none">
                ☰
              </button>
              <Link to="/"> Home </Link>
              <Link to="/createpost"> Create A Post</Link>
              {!authState.status && <Link to="/login"> Login</Link>}
              {authState.status && <button onClick={logout}> Logout</button>}
              <h1>{authState.username} </h1>
            </nav>
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/createpost" exact element={<Postform />} />
              <Route path="/post/:id" exact element={<Fullpost />} />
              <Route path="/register" exact element={<Register />} />
              <Route path="/login" exact element={<Login />} />
            </Routes>
          </Router>
        </AuthContext.Provider>
      </div>
    </div>
  );
}

export default App;
