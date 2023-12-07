import React,{useState,useContext,useEffect} from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Image } from 'cloudinary-react'
import { useNavigate } from 'react-router-dom';

const Postform = () => {
    const navigate = useNavigate()
    const [publicIds, setPublicIds] = useState([]); // This will store the public ids of the uploaded images
    let [publicid, setPublicId] = useState(null); // For storing the public ID from Cloudinary
    useEffect(() => {
        const token = localStorage.getItem("Token");
        if (!token) {
          navigate('/login');
        }
      }, []);
    const initialValues = {
        Title: "",
        Description: "",
        Price: "",
        beds: "",
        baths: "",
        country: "",
        state: "",
        city: "",
        address: "",
        zipcode: "",
        area: "",
        status: "",
        images: []    
    }

    const validationSchema = Yup.object().shape({
        Title: Yup.string().required("Title is required"),
        Description: Yup.string().required("Add some description of your post"),
        Price: Yup.number().positive().required("Enter Price"),
        beds: Yup.number().positive().required("Fill this Field"),
        baths: Yup.number().positive().required("Fill this Field"),
        country: Yup.string().required("Fill this field"),
        state: Yup.string().required("Fill this field"),
        city: Yup.string().required("Fill this field"),
        address: Yup.string().required("Fill this field"),
        zipcode: Yup.number().positive().required("Fill this field"),
        area: Yup.number().positive().required("Fill this field"),
        status: Yup.string().required("Fill this field")




    })

    const formSubmit = (data, { resetForm }) => {
        const formData = new FormData()
        const selectedRadioValue = data.radioField;
        for (let i = 0; i < data.images.length; i++) {
            formData.append('images', data.images[i]);
        }
        formData.append('Title', data.Title);
        formData.append('Description', data.Description);
        formData.append('category', selectedRadioValue);
        formData.append('Price', data.Price);
        formData.append('beds', data.beds);
        formData.append('baths', data.baths);
        formData.append('country', data.country);
        formData.append('state', data.state);
        formData.append('city', data.city);
        formData.append('address', data.address);
        formData.append('zipcode', data.zipcode);
        formData.append('area', data.area);
        formData.append('status', data.status);
        formData.append('image', data.image);

        axios.post("http://localhost:3001/posts", formData, {

            headers: {
                Authorization: `Bearer ${localStorage.getItem('Token')}`
            }
        })

            .then((res) => {
                publicid = res.data.publicid
                console.log("Submitted successfully:", res.data);
                resetForm();
                navigate('/')

            })
            .catch((error) => {
                console.error("Submission error:", error);
            });

    }

    return (
        <div className='bg-white Postform rounded-xl'>

            <Formik initialValues={initialValues} onSubmit={formSubmit} validationSchema={validationSchema}>
                {({ setFieldValue, values }) => (
                    <Form className=' max-w-md mx-auto' encType='multipart/form-data'>
                        <div className='relative z-0 w-full mb-5 group'>

                            <Field
                                className="block bg-white py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                autoComplete="off"
                                id='titleinput'
                                name='Title'
                                placeholder=' ' />

                            <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
                                Title </label>
                            <ErrorMessage name='Title' component="span" />

                        </div>
                        <div className='relative z-0 w-full mb-5 group'>
                            <Field
                                className="block bg-white py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                autoComplete="off"
                                id='descinput'
                                name='Description'
                                placeholder=' ' />
                            <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
                                Description: </label>
                        </div>
                        <div>
                            <label>
                                <Field type="radio" name="radioField" value="House" />
                                House
                            </label>
                            <label>
                                <Field type="radio" name="radioField" value="Flat" />
                                Flat
                            </label> <label>
                                <Field type="radio" name="radioField" value="Upper portion" />
                                Upper portion
                            </label>
                            <label>
                                <Field type="radio" name="radioField" value="Lower Portion" />
                                Lower Portion
                            </label>
                            <label>
                                <Field type="radio" name="radioField" value="Hostel" />
                                Hostel
                            </label>
                            <label>
                                <Field type="radio" name="radioField" value="Room" />
                                Room
                            </label>
                        </div>
                        <div className='relative z-0 w-full mb-5 group'>

                            <Field
                                className="block bg-white py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                autoComplete="off"
                                id="beds"
                                name="beds"
                                placeholder=" "

                            />

                            <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
                                No. of Beds</label>
                        </div>
                        <div className='relative z-0 w-full mb-5 group'>

                            <Field
                                className="block bg-white py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                autoComplete="off"
                                id="bath"
                                name="baths"
                                placeholder=" "

                            />
                            <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
                                No. of Bath</label>
                        </div>
                        <div className='relative z-0 w-full mb-5 group'>

                            <Field
                                className="block bg-white py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                autoComplete="off"
                                id="country"
                                name="country"
                                placeholder=" "

                            />
                            <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
                                Country</label>
                        </div>
                        <div className='relative z-0 w-full mb-5 group'>

                            <Field
                                className="block bg-white py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                autoComplete="off"
                                id="state"
                                name="state"
                                placeholder=" "

                            />
                            <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
                                State/Province</label>
                        </div>
                        <div className='relative z-0 w-full mb-5 group'>

                            <Field
                                className="block bg-white py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                autoComplete="off"
                                id="city"
                                name="city"
                                placeholder=" "

                            />
                            <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
                                City</label>
                        </div>
                        <div className='relative z-0 w-full mb-5 group'>

                            <Field
                                className="block bg-white py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                autoComplete="off"
                                id="address"
                                name="address"
                                placeholder=" "

                            />
                            <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
                                Address e.g: H#4 st:1</label>
                        </div>
                        <div className='relative z-0 w-full mb-5 group'>

                            <Field
                                className="block bg-white py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                autoComplete="off"
                                id="zipcode"
                                name="zipcode"
                                placeholder=" "

                            />
                            <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
                                Zip Code</label>
                        </div>
                        <div className='relative z-0 w-full mb-5 group'>

                            <Field
                                className="block bg-white py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                autoComplete="off"
                                id="area"
                                name="area"
                                placeholder=" "

                            />
                            <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
                                Area e.g: 120sq.yards (Only in square yards)</label>
                        </div>
                        <div className='relative z-0 w-full mb-5 group'>

                            <Field
                                className="block bg-white py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                autoComplete="off"
                                id="status"
                                name="status"
                                placeholder=" "
                            />
                            <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Status</label>
                        </div>

                        <label>Upload images</label>
                            <input
                                className="block bg-white py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                id="images"
                                name="images"
                                type="file"
                                multiple // Allows multiple file selections
                                onChange={(event) => {
                                    const files = event.currentTarget.files;
                                    if (files.length > 10) {
                                        alert('You can only upload up to 10 images.');
                                        return;
                                    }
                                    setFieldValue('images', files); // Set the files to the images field
                                    
                                    // Create image URLs for previews
                                    const fileUrls = Array.from(files).map(file => URL.createObjectURL(file));
                                    setPublicIds(fileUrls); // Update the publicIds state to hold the previews
                                }}
                            />

                            {/* Display image previews before upload */}
                            {publicIds.map((src, index) => (
                                <div key={index}>
                                    <img src={src} alt={`Preview ${index + 1}`} width="100" />
                                </div>
                            ))}

                            {/* Display images from Cloudinary after upload */}
                            {Array.isArray(values.images) && values.images.length > 0 && (
                                values.images.map((image, index) => (
                                    <Image
                                        key={index}
                                        cloudName="dh2as5zu1"
                                        publicId={image.public_id} // Assuming `public_id` is returned from the Cloudinary upload response
                                        width="300"
                                        crop="scale"
                                    />
                                ))
                            )}




                        <label>Price: </label>
                        <ErrorMessage name='Price' component="span" />
                        <Field
                            autoComplete="off"
                            id='Priceinput'
                            name='Price'
                            placeholder='Price' />

                        <button className='block mt-10 mb-10 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'
                            type='submit' id='btn-createpost'>Create Post</button>
                    </Form>
                )}

            </Formik>
        </div>
    )
}

export default Postform

