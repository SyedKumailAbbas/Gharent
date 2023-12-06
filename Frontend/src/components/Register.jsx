import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
const Register = () => {
  const initialValues = {
    fname: "",
    lname: "",
    username: "",
    email: "",
    phoneno: "",
    password: "",
    gender: ""
  }

  const validationSchema = Yup.object().shape({
    fname: Yup.string().required("Enter your first name"),
    lname: Yup.string().required("Enter your last name "),
    username: Yup.string().min(3).max(15).required("Set a unique username"),
    email: Yup.string().email("Invalid email address").required("email is required"),
    phoneno: Yup.string().matches(/^\d{11}$/, 'Invalid phone number').required('Phone number is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8)
      .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, 'Password must contain at least one letter, one number, and one special character'),

  })
  const formSubmit = async (data) => {
    try {
      await axios.post(`http://localhost:3001/auth/register`, data);
      console.log("Registration successful!");

    } catch (error) {
      if (error.response) {

        console.error("Error response:", error.response.data);
        alert(error.response.data.error); // Display a pop-up alert with the error message
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <>
      <section className="  h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
        <div className="md:w-1/3  max-w-sm logobg">

          <img src='/images/logo.png' />
        </div>
       
        <div className="max-w-xs  mx-auto justify-center pt-20 items-center min-h-screen">
          <Formik initialValues={initialValues} onSubmit={formSubmit} validationSchema={validationSchema}>
            <Form className="bg-black bg-opacity-30 rounded-2xl shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
            <p className="mx-4 mb-0 text-center font-semibold text-slate-500">
              Sign Up
            </p>
          </div>
              <label className="block text-gray-700 text-sm font-bold mb-2">First Name: </label>
              <ErrorMessage name="fname" component="span" />
              <Field className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
                autoComplete="off"
                id="fname"
                name="fname"
                placeholder="Firstname"
              />
              <label className="block text-gray-700 text-sm font-bold mb-2">Last Name: </label>
              <ErrorMessage name="lname" component="span" />

              <Field className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
                autoComplete="off"
                id="lname"
                name="lname"
                placeholder="Lastname"
              />
              <label className="block text-gray-700 text-sm font-bold mb-2">Username: </label>
              <ErrorMessage name="username" component="span" />

              <Field className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
                autoComplete="off"
                id="username"
                name="username"
                placeholder="@username" />

              <label className="block text-gray-700 text-sm font-bold mb-2">Email: </label>
              <ErrorMessage name="email" component="span" />

              <Field className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
                type="email"
                autoComplete="off"
                id="email"
                name="email"
                placeholder="abc@gmail.com"
              />
              <label className="block text-gray-700 text-sm font-bold mb-2">Password: </label>
              <ErrorMessage name="password" component="span" />

              <Field className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
                type="password"
                autoComplete="off"
                id="password"
                name="password"
                placeholder="*****"
              />
              <label className="block text-gray-700 text-sm font-bold mb-2">Phone NO: </label>
              <ErrorMessage name="phoneno" component="span" />

              <Field className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
                type="number"
                autoComplete="off"
                id="phoneno"
                name="phoneno"
                placeholder="phone# 1234567890"
              />

              <label className="block text-gray-700 text-sm font-bold mb-2">Gender: </label>
              <ErrorMessage name="gender" component="span" />

              <Field className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
                as="select"
                id="gen"
                name="gender"
              >
                <option value="male">male</option>
                <option value="female">female</option>
              </Field>



              <button type='submit' className='mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider'>Register</button>

            </Form>
          </Formik>
        </div>
      </section>
    </>
  )
}

export default Register
