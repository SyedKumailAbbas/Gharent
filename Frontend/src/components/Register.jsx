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
      <div className="max-w-xs mx-auto justify-center pt-20 items-center min-h-screen">
        <Formik initialValues={initialValues} onSubmit={formSubmit} validationSchema={validationSchema}>
          <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">First Name: </label>
            <ErrorMessage name="fname" component="span" />
            <Field
              autoComplete="off"
              id="fname"
              name="fname"
              placeholder="Firstname"
            />
            <label className="block text-gray-700 text-sm font-bold mb-2">Last Name: </label>
            <ErrorMessage name="lname" component="span" />

            <Field
              autoComplete="off"
              id="lname"
              name="lname"
              placeholder="Lastname"
            />
            <label className="block text-gray-700 text-sm font-bold mb-2">Username: </label>
            <ErrorMessage name="username" component="span" />

            <Field
              autoComplete="off"
              id="username"
              name="username"
              placeholder="@username" />

            <label className="block text-gray-700 text-sm font-bold mb-2">Email: </label>
            <ErrorMessage name="email" component="span" />

            <Field
              type="email"
              autoComplete="off"
              id="email"
              name="email"
              placeholder="abc@gmail.com"
            />
            <label className="block text-gray-700 text-sm font-bold mb-2">Password: </label>
            <ErrorMessage name="password" component="span" />

            <Field
              type="password"
              autoComplete="off"
              id="password"
              name="password"
              placeholder="*****"
            />
            <label className="block text-gray-700 text-sm font-bold mb-2">Phone NO: </label>
            <ErrorMessage name="phoneno" component="span" />

            <Field
              type="number"
              autoComplete="off"
              id="phoneno"
              name="phoneno"
              placeholder="phone# 1234567890"
            />

            <label className="block text-gray-700 text-sm font-bold mb-2">Gender: </label>
            <ErrorMessage name="gender" component="span" />

            <Field
              as="select"
              id="gen"
              name="gender"
            >
              <option value="male">male</option>
              <option value="female">female</option>
            </Field>




            <button type='submit' id='btn-createpost'>Create Post</button>

          </Form>
        </Formik>
      </div>

    </>
  )
}

export default Register
