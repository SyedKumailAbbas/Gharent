import React from 'react'
import Post from '../components/Post'
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
const Home = () => {
  const initialValues={
    search:""
  }
  const searchsubmit=(data,{resetForm})=>{
      console.log(data)
      axios.get(`http://localhost:3001/post/search/:value`,data)
      resetForm();
  }
  return (
    <div>
    {/* searching field  */}
      {/* <Formik initialValues={initialValues} onSubmit={searchsubmit}>
        <Form>
          <Field 
            autoComplete="off"
            id="Searchinp"
            name="search"
            placeholder="Search here..."
            />
            <button id="search-btn" type='submit'>Search</button>
        </Form>
      </Formik> */}

      <Post />
    </div>
  )
}

export default Home
