import { Button, Card, TextField } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { API } from '../Global';
import { useFormik } from 'formik';
import * as yup from "yup";

const signupValidationSchema = yup.object({
    username: yup.string().required("Why not fill this User-Name?").min(1),
    email: yup.string().required("Why not fill this e-mail ID?").min(8),
    password: yup.string().required("Why not fill this Password?").min(8),
})

export default function SignUp() {

    const { handleSubmit, values, handleBlur, handleChange, touched, errors } = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
        },
        validationSchema: signupValidationSchema,
        onSubmit: (newList) => {
            // console.log("new member: ", newList)
            addUser(newList)
        },
    })
    const addUser = (newList) => {
        fetch(`${API}/users/signup`, {
            method: "POST",
            body: JSON.stringify(newList),
            headers: { "Content-Type": "application/json" }
        })
            .then((data) => data.json())
            .then((data) => {
                if (data.message === "Username already exists") {
                    console.log("username already exists");
                } else {
                    console.log("login successfull");
                    navigate('/users/login')
                }
            })
    }

    const navigate = useNavigate();

    return (
        <form className='login' onSubmit={handleSubmit}>
            <Card className='login-card' >
                <h2>Sign Up</h2>
                <div className='login-input'>
                    <TextField
                        name="username"
                        label="User Name"
                        variant="outlined"
                        onChange={handleChange}
                        value={values.username}
                        onBlur={handleBlur}
                    />
                    {touched.username && errors.username ? errors.username : null}
                    <TextField
                        name="email"
                        label="Email"
                        variant="outlined"
                        onChange={handleChange}
                        value={values.email}
                        onBlur={handleBlur}
                    />
                    {touched.email && errors.email ? errors.email : null}
                    <TextField
                        name="password"
                        label="Password"
                        variant="outlined"
                        type='password'
                        onChange={handleChange}
                        value={values.password}
                        onBlur={handleBlur}
                    />
                    {touched.password && errors.password ? errors.password : null}
                    <Button variant="contained" type="submit" color='success'>Register</Button>
                    <p className='text'>Don't have an account <span onClick={() => navigate(`/users/login`)} className='nav'>Login</span> here</p>
                </div>
            </Card>
        </form>
    )
}