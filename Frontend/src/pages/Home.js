// Home component
import React, { useState, useEffect } from 'react';
import Post from '../components/Post';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

const Home = () => {
  const [input, setinput] = useState('');
  const [posts, setPosts] = useState([]);
  const [initialFetchDone, setInitialFetchDone] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false); // State for managing sidebar
  
  // Toggle the sidebar open and closed
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const toggleStyle = {
    zIndex: '100',
    position: 'fixed',
    top: '50%', // Center vertically
    left: isSidebarOpen ? '250px' : '0', // Position based on sidebar state
    transform: 'translateY(-50%)', // Center vertically
    cursor: 'pointer',
    fontSize: '40px',
    border: 'none',
    background: 'none',
    color: 'black', // Change as needed
    transition: 'left 0.3s, transform 0.3s', // Transition for smooth transform
  };
  // Function to fetch all posts
  const fetchAllPosts = () => {
    axios.get(`http://localhost:3001/posts`)
      .then((response) => {
        setPosts(response.data.posts);
        setInitialFetchDone(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Function to fetch posts based on search input
  const searchPosts = () => {
    console.log(input)
    axios.get(`http://localhost:3001/posts/search/${input}`)
      .then((response) => {
        setPosts(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Use useEffect to trigger the initial fetch when the component mounts
  useEffect(() => {
    if (!initialFetchDone) {
      fetchAllPosts();
    }
    else {
      searchPosts()
    }
  }, [initialFetchDone]);

  // Use useEffect to trigger the search when the input value changes
  useEffect(() => {
    if (initialFetchDone) {
      searchPosts();
    }
  }, [input]);

  return (
    <div style={{ display: 'flex', height: '100vh', position: 'relative' }}>
    <Sidebar isOpen={isSidebarOpen} />
    
    {/* Sidebar toggle button */}
    <div
      onClick={toggleSidebar}
      onMouseEnter={(e) => e.target.style.transform = 'translateY(-50%) rotate(180deg)'} // Rotate to become an arrow
      onMouseLeave={(e) => e.target.style.transform = 'translateY(-50%)'} // Back to a line
      style={toggleStyle}
    >
      {isSidebarOpen ? '>' : '<'} {/* Change direction of arrow based on state */}
    </div>

    <div style={{
      transition: 'margin-left 0.3s',
      marginLeft: isSidebarOpen ? '250px' : '0',
      padding: '20px',
      flexGrow: 1,
      width: isSidebarOpen ? 'calc(100% - 250px)' : '100%', // Adjust width based on sidebar
      overflowX: 'hidden'
    }}>
      {/* Searching field */}
      <div>
      <input
        className="inline w-500 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        type="text"
        value={input}
        onChange={(event) => setinput(event.target.value)}
      />

      {/* Search button */}
      <button
        className="inline bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => searchPosts()}
      >
        Search
      </button>
</div>
      {/* Display posts or search results */}
      <Post apiEndpoint="http://localhost:3001/posts" />
    </div>
  </div>
  );
};

export default Home;
