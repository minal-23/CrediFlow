import React, { useContext } from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
import axios from 'axios';
import UserContext from '../../context/notes/UserContext';
import { useNavigate } from 'react-router-dom';

const initialValues = {
    username: '',
    password: '',
};

const validationSchema = yup.object({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
});

function AdminLogin() {

    const {setAdminAuth} = useContext(UserContext);
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            console.log('Submitted values:', values);
            axios.post('http://localhost:8765/api/v1/users/admin/login', values)
            .then(response => {
                if(response.data){
                    console.log("minall")
                    navigate('dashboard')
                    setAdminAuth(values.username)
                }
                else{
                    alert('Invalid Credentials');
                }
            })
            .catch(e => console.log(e));
        },
    });

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark custom-navbar-color fixed-top">
                <div className="container-fluid" style={{ display: 'flex' }}>
                    <a href="/" className="navbar-brand" style={{ flex: 0.40 }}>
                        <img src="/Capture.jpg" alt="" width="50" height="50" />
                    </a>
                    <div className="navbar-brand" style={{ flex: 0.60, textAlign: 'start', padding: '2vh' }}>
                        <h1>ADMIN LOGIN</h1>
                    </div>
                </div>
            </nav>

            <Container sx={{paddingBottom:'160px', paddingTop:'100px'}}>
            <form onSubmit={formik.handleSubmit} style={{paddingTop:'150px'}}>
                <h3>Login Form</h3>
                <TextField
                    fullWidth
                    id="username"
                    name="username"
                    label="Username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                    sx={{marginTop:'10px'}}
                />

                <TextField
                    fullWidth
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    sx={{marginTop:'10px'}}
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={!formik.isValid}
                    sx={{marginTop:'10px'}}
                >
                    Submit
                </Button>
            </form>
            </Container>
        </>
    )
}

export default AdminLogin