import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Searchpost = () => {
  const { input } = useParams();
  const [allpost, setAllPost] = useState([]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data for value:', input);
        const response = await axios.get(`http://localhost:3001/posts/search/${input}`);
        
        if (response.data) {
          console.log('Data fetched successfully:', response.data);
          setAllPost(response.data.posts.rows);
        } else {
          console.error('No posts found in the response:', response.data.error);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [input]);
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {allpost.map((value, key) => (
        <div
          className="rounded overflow-hidden shadow-lg bg-gradient-to-br from-teal-400 to-blue-500 hover:shadow-2xl transform hover:scale-105 transition duration-300"
          key={key}
        >
          <img
            // Additional attributes based on your data structure
            className="w-full h-48 object-cover"
            src={value.Images[0].imageurl} // Fix the reference to the Images array
            alt={value.Title}
          />
          <div className="px-6 py-4">
            <div className="font-roboto text-2xl mb-2 text-white">
              {value.Title}
            </div>
            <p className="font-lato text-white text-lg">
              {value.Description?.bed} bed | {value.Description?.bath} bath | {value.Description?.area} sq.ft
            </p>
            <p className="font-lato text-white mt-2 text-sm">
              Price: {value.Price} | Posted on {formatDate(value.createdAt)}
            </p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <button
              className="inline-block bg-yellow-500 text-white px-4 py-2 rounded-md font-lato-semibold hover:bg-yellow-600 transition duration-300"
              // Additional actions based on your requirements
            >
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Searchpost;
