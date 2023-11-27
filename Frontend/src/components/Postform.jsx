import React from 'react'
import { Formik, Form, Field, ErrorMessage,useFormikContext } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Image } from 'cloudinary-react'
const Postform = () => {
    const { setFieldValue, values } = useFormikContext();

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
        status: ""
    }

    const validationSchema = Yup.object().shape({
        Title: Yup.string().required("Title is required"),
        Description: Yup.string().required("Add some description of your post"),
        Price: Yup.number().positive().required("Enter Price"),
        beds: Yup.number.positive().required("Fill this Field"),
        baths: Yup.number.positive().required("Fill this Field"),
        country: Yup.string().required("Fill this field"),
        state: Yup.string().required("Fill this field"),
        city: Yup.string().required("Fill this field"),
        address: Yup.string().required("Fill this field"),
        zipcode: Yup.number().positive().required("Fill this field"),
        area: Yup.string().positive().required("Fill this field"),
        status: Yup.string().required("Fill this field")




    })

    const formSubmit = (data, { resetForm }) => {
        const formData = new FormData()
        formData.append('Title', data.Title);
        formData.append('Description', data.Description);
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

        axios.post("http://localhost:3001/posts", formData).then((res) => {
            console.log("submitted")
            resetForm()
        })

    }

    return (
        <div className='Postform'>
            <Formik initialValues={initialValues} onSubmit={formSubmit} validationSchema={validationSchema}>
                <Form encType='multipart/form-data'>
                    <label>Title: </label>
                    <ErrorMessage name='Title' component="span" />
                    <Field
                        autoComplete="off"
                        id='titleinput'
                        name='Title'
                        placeholder='Title' />
                    <label>Description: </label>
                    <ErrorMessage name='Description' component="span" />
                    <Field
                        autoComplete="off"
                        id='descinput'
                        name='Description'
                        placeholder='Description' />
                    <label>Beds</label>
                    <Field
                        autoComplete="off"
                        id="beds"
                        name="beds"
                        placeholder="No. of beds"

                    />
                    <label>Bath</label>
                    <Field
                        autoComplete="off"
                        id="bath"
                        name="baths"
                        placeholder="No. of baths"

                    />
                    <label>Country</label>
                    <Field
                        autoComplete="off"
                        id="country"
                        name="country"
                        placeholder="e.g: Pakistan"

                    />
                    <label>State</label>
                    <Field
                        autoComplete="off"
                        id="state"
                        name="state"
                        placeholder="state or province"

                    />
                    <label>City</label>
                    <Field
                        autoComplete="off"
                        id="city"
                        name="city"
                        placeholder="city"

                    />
                    <label> Address</label>
                    <Field
                        autoComplete="off"
                        id="address"
                        name="address"
                        placeholder="Address e.g: H#4 st:1"

                    />
                    <label>Zip Code</label>
                    <Field
                        autoComplete="off"
                        id="zipcode"
                        name="zipcode"
                        placeholder="zipcode"

                    />
                    <label>Area</label>
                    <Field
                        autoComplete="off"
                        id="area"
                        name="area"
                        placeholder="120 Sq.yr"

                    />
                    <label>Status</label>
                    <Field
                        autoComplete="off"
                        id="status"
                        name="status"
                        placeholder="status"

                    />
                    <label>Upload image</label>
                    <Field
                        id="image"
                        name="image"
                        type="file"
                        onChange={(event) => {
                            setFieldValue('image', event.currentTarget.files[0]);
                        }}
                    />
                    {values.image && (
                        <Image
                            cloudName="dh2as5zu1"
                            publicId={values.image.name}
                            width="300"
                            crop="scale"
                        />
                    )}


                    <label>Price: </label>
                    <ErrorMessage name='Price' component="span" />
                    <Field
                        autoComplete="off"
                        id='Priceinput'
                        name='Price'
                        placeholder='Price' />

                    <button type='submit' id='btn-createpost'>Create Post</button>
                </Form>
            </Formik>
        </div>
    )
}

export default Postform
