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
        // Check if response.data.posts is defined before updating the state
        if (response.data.posts) {
          setAllPost(response.data.posts);
        } else {
          console.error('No posts found in the response:', response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle errors as needed
      }
    };
  
    fetchData();
  }, [apiEndpoint]);
  // Use apiEndpoint as a dependency

  const deletePost = (id) => {
    const token = localStorage.getItem('Token');
    axios
      .delete(`http://localhost:3001/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        navigate('/');
      });
  };

  return (
    <>
      {allpost.map((value, key) => (
        <div
          className='m-2 w-maxContent bg-whitesmoke relative max-w-sm aspect-w-1 aspect-h-1 hover:text-black inline-block bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'
          key={key}
        >
          <div className='hover:text-black text-yellow-300 '>
            <img
              onClick={() => {
                navigate(`/post/${value.pid}`);
              }}
              className='lg:w-[400px] lg:h-[200px] rounded-t-lg filter grayscale bl r-sm hover:grayscale-0'
              src={value.images[0]}
              alt={value.Title}
            />
            <h1 className='absolute bottom-20 right-50 font-bold stroke-1 stroke-black-500'>
              {value.Title}
            </h1>
          </div>
          <div>
            <div>{value.Price}</div>
          </div>
          <div>
            <div>{value.description?.bed} bed</div>
            <div>{value.description?.bath} bath</div>

          </div>
          <div>
            <div>{value.description?.area}sq.ft</div>
          </div>
          <div>
            <div >{formatDate(value.createdAt)}
            {authState.username === value.user?.username && (
              <button className='inline'
                onClick={() => {
                  deletePost(value.pid);
                }}
              >
                X
              </button>
            )}
            </div>
            
          </div>
        </div>
      ))}
    </>
  );
};

export default Post;
