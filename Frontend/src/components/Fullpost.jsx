import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios';
import styled from 'styled-components'
import Comment from './Comment';
//writing some styled-components css for this component
const Postmaindiv = styled.div`
width:500px;
margin:10px auto;
background-color:whitesmoke;
display:center;
`
const PostHeader = styled.div`
background-color: black;
`
const PostTitle = styled.div`
background-color: lightblue;
color: white;

`

const PostDescription = styled.div`
background-color: lightyellow;
height:4rem;
color: black;
white-space:nowrap;
overflow:hidden;
text-overflow:ellipsis;

`

const Fullpost = () => {
  let { id } = useParams()
  const [postview, setview] = useState({})
  const [comments,setlistofcomments]=useState([]);
  const [newcomment,setcomment]=useState("");

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byid/${id}`).then((res) => {
      setview(res.data)})
      axios.get(`http://localhost:3001/comments/${id}`).then((res) => {
        setlistofcomments(res.data)
      })


    }, [])
const addcomment=()=>{
  axios.post(`http://localhost:3001/comments`,{Comment_Body:newcomment,PostPid:id},
  {
    headers:{
      token:sessionStorage.getItem("token")
    }
  }
  ).then((res)=>{
  const commenttoadd={Comment_Body:newcomment}
  setlistofcomments([...comments,commenttoadd])
  setcomment("")
  })
  .catch((error)=>{

    alert(error)
  })
  
}
    return (
      <>

        <Postmaindiv>

          <div className="rightside">
            <PostHeader>
              <PostTitle>{postview.Title}</PostTitle>
            </PostHeader>
            <div className="Postbody">
              <PostDescription>{postview.Description}</PostDescription>
            </div>
            <div className="PostFooter">
              <div className="Postuser">{postview.Price}</div>
              <div className="Posttime">{postview.CreatedAt}</div>
            </div>
          </div>

          {/* <Comment id={id}/> */}
          <div className='leftside'>
            <div className='cmntinput'>
              
                <input type='text' placeholder='Add comment...' value={newcomment} required onChange={(event)=>{
                  setcomment(event.target.value)
                }}/>
              <button onClick={addcomment}>Submit</button>
            </div>
            <div className='listofcomments'>
              {
                comments.map((value, key) => {
                  return (
                    <div className='commentbody' key={key}>{value.Comment_Body}</div>
                  )
                })
              }
            </div>

          </div>
        </Postmaindiv>



      </>
    )
  }

export default Fullpost
