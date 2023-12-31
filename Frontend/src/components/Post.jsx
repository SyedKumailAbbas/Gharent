import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Helpers/AuthContext';

const Post = ({ apiEndpoint }) => {
  const [allpost, setAllPost] = useState([]);
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiEndpoint);
        if (response.data.posts) {
          setAllPost(response.data.posts);
        } else {
          console.error('No posts found in the response:', response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [apiEndpoint]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {allpost.map((value, key) => (
        <div
          className="rounded overflow-hidden shadow-lg bg-gradient-to-br from-teal-400 to-blue-500 hover:shadow-2xl transform hover:scale-105 transition duration-300"
          key={key}
        >
          <img
            onClick={() => navigate(`/post/${value.pid}`)}
            className="w-full h-48 object-cover"
            src={value.images[0]}
            alt={value.Title}
          />
          <div className="px-6 py-4">
            <div className="font-roboto text-2xl mb-2 text-white">
              {value.Title}
            </div>
            <p className="font-lato text-white text-lg">
              {value.description?.bed} bed | {value.description?.bath} bath |{' '}
              {value.description?.area} sq.ft
            </p>
            <p className="font-lato text-white mt-2 text-sm">
              Price: {value.Price} | Posted on {formatDate(value.createdAt)}
            </p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <button
              className="inline-block bg-yellow-500 text-white px-4 py-2 rounded-md font-lato-semibold hover:bg-yellow-600 transition duration-300"
              onClick={() => navigate(`/post/${value.pid}`)}
            >
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Post;
