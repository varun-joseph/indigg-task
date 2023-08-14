import { Button, Card, TextField } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { API } from '../Global';

export default function Login() {

    const navigate = useNavigate();

    React.useEffect(() => {
        if (localStorage.getItem("token")) navigate("/")
    })
    const { handleChange, values, handleSubmit } = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: (values) => {
            //  console.log(values);

            fetch(`${API}/users/login`, {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(values)
            })
                .then((data) => data.json())
                .then(data => {
                    if (data.status === 401) {
                        console.log("Login Failed");
                    } else {
                        localStorage.setItem("Auth", values.email)
                        localStorage.setItem("token", data.token);
                        navigate("/");
                        window.location.reload();
                    }


                })
        }
    })


    return (
        <form className='login' onSubmit={handleSubmit}>
            <Card className='login-card'>
                <h2>Sign In</h2>
                <div className='login-input'>
                    <TextField
                        name="email"
                        label="Email"
                        type='email'
                        variant="outlined"
                        onChange={handleChange}
                        value={values.email}
                    />

                    <TextField
                        name="password"
                        label="Password"
                        variant="outlined"
                        type='password'
                        onChange={handleChange}
                        value={values.password}
                    />
                    <Button variant="contained" type="submit" color='error'>Login</Button>

                    <p className='text'>Don't have an account <span onClick={() => navigate(`/users/signup`)} className='nav'>Register</span> here</p>
                </div>
            </Card>
        </form>
    )
}