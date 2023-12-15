import React, { useState, useEffect } from 'react';
import Post from '../components/Post';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Searchpost from '../components/Search';
import { useNavigate } from 'react-router-dom';
const Home = () => {

  const navigate=useNavigate()
  const [input, setinput] = useState('');
  const [posts, setPosts] = useState([]);
  const [initialFetchDone, setInitialFetchDone] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [searchResultsVisible, setSearchResultsVisible] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggleStyle = {
    zIndex: '100',
    position: 'fixed',
    top: '50%',
    left: isSidebarOpen ? '250px' : '0',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    fontSize: '40px',
    border: 'none',
    background: 'none',
    color: 'black',
    transition: 'left 0.3s, transform 0.3s',
  };

  const searchPosts = (input) => {
    // Your logic to set the input value
navigate(`/search/${input}`)
    // Conditionally render the Searchpost component
    // if (input) {
    //   return <Searchpost val={input} />;
    // } else {
    //   return <p>No input provided</p>;
    // }
  };


  const handleFilterApply = async (filters) => {
    try {
      const response = await axios.get('http://localhost:3001/posts/filter-posts', { params: filters });
      setPosts(response.data.posts);
    } catch (error) {
      console.error('Error fetching filtered posts:', error);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', position: 'relative' }}>
      <Sidebar isOpen={isSidebarOpen} onApplyFilters={handleFilterApply} />

      <div
        onClick={toggleSidebar}
        onMouseEnter={(e) => (e.target.style.transform = 'translateY(-50%) rotate(180deg)')}
        onMouseLeave={(e) => (e.target.style.transform = 'translateY(-50%)')}
        style={toggleStyle}
      >
        {isSidebarOpen ? '>' : '<'}
      </div>

      <div
        style={{
          transition: 'margin-left 0.3s',
          marginLeft: isSidebarOpen ? '250px' : '0',
          padding: '20px',
          flexGrow: 1,
          width: isSidebarOpen ? 'calc(100% - 250px)' : '100%',
          overflowX: 'hidden',
        }}
      >
        <div>
          <input
            className="inline w-500 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            value={input}
            onChange={(event) => setinput(event.target.value)}
          />

          <button
            className="inline bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => searchPosts(input)}
          >
            Search


          </button>
        </div>

  <Post apiEndpoint="http://localhost:3001/posts" />

      </div>
    </div>
  );
};

export default Home;
