import React, {useState} from 'react'
import {  Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
const Login = () => {
  const [username,setusername]=useState("")
  const [password,setpassword]=useState("")
  const navigate=useNavigate()
  const formSubmit = async () => {
    const data = {username:username,password:password}
      await axios.post(`http://localhost:3001/auth/login`, data).then((response)=>{

        console.log("Login successfully");
        if (response.data.error) alert(response.data.error)
        else sessionStorage.setItem("token",response.data)
        navigate('/')

      });

  };
  

  return (
    <>
      <div className="max-w-xs mx-auto justify-center pt-20 items-center min-h-screen">
      <fieldset>
        <legend className='signin'>Sign in</legend>
        </fieldset>
      <input  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        type='text'
        onChange={(event)=>{setusername(event.target.value)
        }}
      />
      <input  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        type='password'
        onChange={(event)=>{setpassword(event.target.value)
        }}

        />
        
            <button onClick={formSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
              Sign In
            </button>

            <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
              Forgot Password?
            </a>

            <Link className="block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" to="/register">New here Sign up!</Link>
         
       
        <p className="text-center text-gray-500 text-xs">
          &copy;2023 Gharent. All rights reserved.
        </p>
      </div>
    </>
  )
}

export default Login
