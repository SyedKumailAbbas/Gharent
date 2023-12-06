import React ,{useContext} from 'react'
import Post from '../components/Post'
import { AuthContext } from '../Helpers/AuthContext';


function Profile() {
  const { authState } = useContext(AuthContext);

  return (
    <div>
              {authState.status && <button> {authState.username} </button>}

           
      <Post apiEndpoint="http://localhost:3001/posts/profile" />
    </div>
  )
}

export default Profile
