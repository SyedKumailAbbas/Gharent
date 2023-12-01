//this component is showing all post in the database we have
import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'

const Post = () => {
  const [allpost, setallpost] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((res) => {
      const response = res.data
      setallpost(response.posts)
    })


  }, [])
  const navigate = useNavigate();

  return (
    <>{
      
       allpost.map((value, key) => {
        return (
      <div className='bg-white rounded-xl overflow-hidden shadow-xl hover:scale-105 hover:shadow-2xl transform duration-500 cursor-pointer' onClick={() => { navigate(`/post/${value.pid}`) }} key={key}>
        <div>
          <img src={value.Image.imageurl}/>
          <div >{value.Title}</div>
        </div>
        <div >
          <div>{value.Description.desctxt}</div>
        </div>
        <div >
          <div >23-4-12</div>
        </div>
      </div>
      )
      })
    }



    </>
  );
}

export default Post
