import React, { useState, useEffect ,useContext} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../Helpers/AuthContext";
const Post = () => {
  const [allpost, setAllPost] = useState([]);
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/posts");
        setAllPost(response.data.posts);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors as needed
      }
    };

    fetchData();
  }, []); // Empty dependency array means it will run once on mount
  const deletePost = (id) => {
    axios
      .delete(`http://localhost:3001/posts/${id}`, {
        headers: { token: localStorage.getItem("Token") },
      })
      .then(() => {
        navigate("/");
      });
  };
  return (
    <>
      {allpost.map((value, key) => (
        <div
          className='m-2 w-maxContent bg-whitesmoke relative max-w-sm aspect-w-1 aspect-h-1 hover:text-black inline-block bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'
          key={key}
        >
          <div className='hover:text-black text-white '>
         
            <img onClick={() => { navigate(`/post/${value.pid}`) }} className='w-[400px] h-[150px] h-auto rounded-t-lg filter grayscale bl r-sm hover:grayscale-0' src={value.Image?.imageurl} alt={value.Title} />
            <h1 className='absolute bottom-20 right-50 font-bold stroke-1 stroke-black-500'>{value.Title}</h1>
          </div>
          <div>
            <div>{value.Price}</div>
          </div>
          <div>
            <div>{value.Description?.area}sq.ft</div>
          </div>
          <div>
            <div>23-4-12</div>
          {authState.username === value.User.username && (
                <button  onClick={() => {
                  deletePost(value.pid);
                }}>X</button>
                )}
          </div>
        </div>
      ))}
    </>
  );
};

export default Post;
