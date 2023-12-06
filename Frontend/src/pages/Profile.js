import React from 'react'
import Post from '../components/Post'
function Profile() {
  return (
    <div>
      <Post apiEndpoint="http://localhost:3001/posts/profile" />
    </div>
  )
}

export default Profile
