import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link, NavLink } from "react-router-dom";
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
import Profile from "./pages/Profile";
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
            <nav className="text-white flex flex-row-reverse p-4 " >
              
              <Link to="/createpost" className="px-4"> Create A Post</Link>
              {!authState.status && <Link to="/login" className="px-4"> Login</Link>}
              {authState.status && <button onClick={logout} className="px-4"> Logout</button>}
              <NavLink
                                    to="/"
                                    className={({isActive}) =>
                                        `block ${isActive ? "text-orange-700" : "text-gray-200"} py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    Home
                                </NavLink>
              <h1>{authState.username} </h1>
            </nav>
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/createpost" exact element={<Postform/>} />
              <Route path="/profile" exact element={<Profile />} />
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
