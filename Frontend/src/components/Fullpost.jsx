import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../Helpers/AuthContext';
import DynamicImageCarousel from './DynamicImageCarousel'; // Adjust the path accordingly
import 'bootstrap/dist/css/bootstrap.min.css';

function Fullpost() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byid/${id}`)
      .then((response) => {
        setPostObject(response.data);
      })
      .catch((error) => {
        console.error('Failed to fetch post:', error);
      });

    axios.get(`http://localhost:3001/comments/${id}`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error('Failed to fetch comments:', error);
      });
  }, [id]);

  const addComment = () => {
    const token = localStorage.getItem('Token');

    axios
      .post(
        `http://localhost:3001/comments`,
        {
          CommentBody: newComment,
          pid: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const { data, error } = response.data;

        if (error) {
          alert('Error: ' + error);
        } else {
          const commentToAdd = { ...data, Comment_Body: newComment };
          setComments([...comments, commentToAdd]);
          setNewComment('');
        }
      })
      .catch((error) => {
        console.error('Failed to add comment:', error);
      });
  };

  const deleteComment = (commentId) => {
    axios
      .delete(`http://localhost:3001/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('Token')}` },
      })
      .then(() => {
        setComments(comments.filter((val) => val.id !== commentId));
      })
      .catch((error) => {
        console.error('Failed to delete comment:', error);
      });
  };

  return (
    <div className="postPage" style={{ padding: '20px' }}>
      <div className='row'>
        {/* Post Details Section */}
        <div className="col-md-6" style={{ padding: '15px' }}>
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '5px' }}>
            {/* Image Carousel */}
            {postObject.posts && postObject.posts.images && (
              <DynamicImageCarousel images={postObject.posts.images} />
            )}

            {/* Post Content */}
            <h2>{postObject.posts ? postObject.posts.Title : ''}</h2>
            <p style={{ fontWeight: 'bold' }}>Price: {postObject.posts ? postObject.posts.Price : ''}</p>
            <p>Bedrooms: {postObject.posts && postObject.posts.description && postObject.posts.description.bed ? postObject.posts.description.bed : 'N/A'}</p>
            <p>Bathrooms: {postObject.posts && postObject.posts.description && postObject.posts.description.bath ? postObject.posts.description.bath : 'N/A'}</p>
            <p>{postObject.posts && postObject.posts.description && postObject.posts.description.desctxt ? postObject.posts.description.desctxt : ''}</p>
           <div>
            <p className='inline'>{postObject.posts && postObject.posts.location && postObject.posts.location.country ? postObject.posts.location.country : ''}</p>
            &nbsp;&nbsp;
            <p className='inline'>{postObject.posts && postObject.posts.location && postObject.posts.location.state ? postObject.posts.location.state : ''}</p>
            &nbsp;&nbsp;
            <p className='inline'>{postObject.posts && postObject.posts.location && postObject.posts.location.city ? postObject.posts.location.city : ''}</p>
          
            </div>
            <div>
            <p className='inline'>{postObject.posts && postObject.posts.user && postObject.posts.user.username ? postObject.posts.user.username : ''}: </p>
            <p className='inline'>{postObject.posts && postObject.posts.user && postObject.posts.user.phoneno ? postObject.posts.user.phoneno : ''}</p>

            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="col-md-6" style={{ padding: '15px' }}>
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '5px', marginTop: '20px' }}>
            <input
              type="text"
              placeholder="Query..."
              autoComplete="off"
              value={newComment}
              onChange={(event) => setNewComment(event.target.value)}
              style={{ width: '100%', marginBottom: '10px' }}
            />
            <button onClick={addComment} style={{ width: '100%', padding: '10px 0' }}>Add Query</button>

            {/* List of Comments */}
            <div style={{ marginTop: '20px' }}>
              {comments.map((comment, key) => (
                <div key={key} style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
                  <strong>{comment.User ? comment.User.username : 'Unknown user'}:</strong>
                  <p>{comment.Comment_Body}</p>
                  {authState.username === (comment.User ? comment.User.username : '') && (
                    <button onClick={() => deleteComment(comment.id)}>
                      Delete
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Fullpost;
