import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from "../Helpers/AuthContext";
const Login = () => {
  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")
  const { setAuthState } = useContext(AuthContext);

  const navigate = useNavigate()
  const formSubmit = async () => {
    const data = { username: username, password: password }
    await axios.post(`http://localhost:3001/auth/login`, data).then((response) => {

      console.log("Login successfully");
      if (response.data.error) alert(response.data.error)
      else {
        localStorage.setItem("Token", response.data.token)
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
        navigate('/')
      }
    });

  };


  return (
    // <>
    // <section className="flex flex-col md:flex-row items-center justify-center space-y-10 md:space-y-0 md:space-x-16  my-2 mx-auto md:mx-0 md:my-0 bg-black">
    // <div className='maindiv bg-white h-max'>
    //   <div className="max-w-xs mx-auto justify-center pt-20 items-center min-h-screen">
    //   <fieldset>
    //     <legend className='signin'>Sign in</legend>
    //     </fieldset>
    // <input  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
    //   type='text'
    //   onChange={(event)=>{setusername(event.target.value)
    //   }}
    // />
    // <input  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
    //   type='password'
    //   onChange={(event)=>{setpassword(event.target.value)
    //   }}

    //     />

    //         <button onClick={formSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
    //           Sign In
    //         </button>

    //         <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
    //           Forgot Password?
    //         </a>

    //         <Link className="block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" to="/register">New here Sign up!</Link>


    //     <p className="text-center text-gray-500 text-xs">
    //       &copy;2023 Gharent. All rights reserved.
    //     </p>
    //   </div>
    //   </div>
    //   </section>
    // </>

    <>
      <section className="  h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
        <div className="md:w-1/3  max-w-sm logobg">

          <img src='/images/logo.png' />
        </div>
        <div className="bg-black bg-opacity-30 rounded-2xl md:w-1/3 max-w-sm">

          <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
            <p className="mx-4 mb-0 text-center font-semibold text-slate-500">
              Sign In
            </p>
          </div>

          <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
            type='text'
            onChange={(event) => {
              setusername(event.target.value)
            }}
          />
          <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
            type='password'
            onChange={(event) => {
              setpassword(event.target.value)
            }} />
          <div className="text-center md:text-left">
            <button onClick={formSubmit}
              className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
              type="submit"
            >
              Login
            </button>
          </div>
          <div className="mt-4 font-extrabold text-sm text-white text-center md:text-left">
            &nbsp; Don&apos;t have an account?{" "}
            <a
              className="text-yellow-400 hover:underline hover:underline-offset-4"
              href="/register"
            >
              Register
            </a>
          </div>
        </div>
      </section>
    </>

  )
}

export default Login
