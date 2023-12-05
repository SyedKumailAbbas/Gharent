// Home component
import React, { useState, useEffect } from 'react';
import Post from '../components/Post';
import axios from 'axios';

const Home = () => {
  const [input, setinput] = useState('');
  const [posts, setPosts] = useState([]);
  const [initialFetchDone, setInitialFetchDone] = useState(false);

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
  }, [initialFetchDone]);

  // Use useEffect to trigger the search when the input value changes
  useEffect(() => {
    if (initialFetchDone) {
      searchPosts();
    }
  }, [input]);

  return (
    <div>
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
      {posts && (
        <Post posts={posts} />
      )}
    </div>
  );
};

export default Home;
