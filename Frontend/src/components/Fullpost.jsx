import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Helpers/AuthContext";

function Fullpost() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byid/${id}`)
      .then((response) => {
        setPostObject(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch post:", error);
      });

    axios.get(`http://localhost:3001/comments/${id}`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch comments:", error);
      });
  }, [id]); // Added id to the dependency array

  const addComment = () => {
    axios
      .post(
        "http://localhost:3001/comments",
        {
          commentBody: newComment,
          PostId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert("Error: " + response.data.error);
        } else {
          const commentToAdd = { ...response.data, commentBody: newComment };
          setComments([...comments, commentToAdd]);
          setNewComment("");
        }
      })
      .catch((error) => {
        console.error("Failed to add comment:", error);
      });
  };

  const deleteComment = (commentId) => {
    axios
      .delete(`http://localhost:3001/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("Token")}` },
      })
      .then(() => {
        setComments(comments.filter((val) => val.id !== commentId));
      })
      .catch((error) => {
        console.error("Failed to delete comment:", error);
      });
  };

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title">{postObject.Title}</div>
          <div className="body">{postObject.Price}</div>
         {/* Access the image URL using the correct property name */}
      {postObject.Image && postObject.Image.imageurl && (
        <img src={postObject.Image.imageurl} alt="Post" />
      )}
        </div>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
          <input
            type="text"
            placeholder="Comment..."
            autoComplete="off"
            value={newComment}
            onChange={(event) => setNewComment(event.target.value)}
          />
          <button onClick={addComment}>Add Comment</button>
        </div>
        <div className="listOfComments">
          {comments.map((comment, key) => {
            return (
              <div key={key} className="comment">
                {comment.commentBody}
                <label> Username: {comment.username}</label>
                {authState.username === comment.username && (
                  <button
                    onClick={() => deleteComment(comment.id)}
                    aria-label={`Delete comment by ${comment.username}`}
                  >
                    X
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Fullpost;
