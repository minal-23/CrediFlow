import React, {useState,useContext} from 'react';
import { Grid, Paper, Typography, TextField, Button, Container } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../../context/notes/UserContext';
const initialValues = {
  mobileNumber: '',
};

const validationSchema = Yup.object({
  mobileNumber: Yup.string()
      .required('Mobile number is required')
      .matches(/^\d{10}$/, 'Mobile number must be 10 digits'),
});

const GoldLoanForm = () => {
    const { otpAuth, setotpAuth } = useContext(UserContext);

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            console.log(otpAuth);
            // axios.post(`http://localhost:8765/api/v1/otp/sendotp/91${values.mobileNumber}`)
            // .then(response => {
            //     setnextform(true);
            // })
            // .catch(e => console.log(e));
            setnextform(true);
        },
    });

    const navigate = useNavigate();

    const [nextform, setnextform] = React.useState(false);

    const [otp, setOtp] = useState('');
    const [submittedOtp, setSubmittedOtp] = useState('');


    const handleOtpChange = (e) => {
        const value = e.target.value;
        if (/^\d{0,4}$/.test(value)) {
            setOtp(value);
        }
    };

    return (
        <div
        style={{
            background: 'linear-gradient(to right, #8e44ad, transparent)',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            flexWrap: 'wrap',
            paddingTop: '80px'
        }}
    >
        <div>
            <Container gutterBottom sx={{ textAlign: 'center' }}>
                <h1>Gold Loans upto <br /><strong>Rs. 10,00,000</strong></h1>
                <hr />
                <div style={{ display: 'flex', flexDirection: 'column', fontSize: '2vw' }}>
                    <Typography><DoneIcon color="black" /> Attractive Interest Rates</Typography>
                    <Typography><DoneIcon color="black" /> Easy-To-Use Online Application</Typography>
                    <Typography><DoneIcon color="black" /> Quick Approval</Typography>
                </div>
            </Container>
        </div>
        <Paper elevation={3} style={{ padding: '20px' }}>
            {!nextform ?
                <Grid>
                    <Typography variant="h5" gutterBottom>
                        Start your application
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        Enter your mobile number to continue
                    </Typography>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="Mobile Number"
                                    name="mobileNumber"
                                    id="mobileNumber"
                                    value={formik.values.mobileNumber}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.mobileNumber && Boolean(formik.errors.mobileNumber)}
                                    helperText={formik.touched.mobileNumber && formik.errors.mobileNumber}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                >
                                    Continue
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
                :
                <Grid sx={{ width: '300px' }}>

                    <Typography variant="h6" gutterBottom>
                        OTP sent to mobile number {formik.values.mobileNumber}
                        <EditIcon sx={{ fontSize: '23px', color: '#8e44ad', "&:hover": { cursor: 'pointer' } }} onClick={() => { formik.setValues({ mobileNumber: '' }); setnextform(false); }} />
                    </Typography>

                    <form>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    type="text"
                                    variant="outlined"
                                    placeholder="Enter 4-digit OTP"
                                    value={otp}
                                    onChange={handleOtpChange}
                                    inputProps={{ maxLength: 4 }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={(e) => {
                                        e.preventDefault();
                                        console.log(otp);
                                        const regex = /^\d{4}$/;
                                        if (!(regex.test(otp))){
                                            alert("Enter OTP")
                                            return;
                                        }
                                        const headers = {
                                            'phoneNumber': '91' + formik.values.mobileNumber,
                                            'otp': otp,
                                          };
                                          
                                          navigate('upload');
                                        //   axios.post('http://localhost:8765/api/v1/otp/auth', null, {
                                        //     headers: headers,
                                        //   })
                                        //   .then(response => {
                                        //     if(response.data === 'Authenticated'){
                                        //         setotpAuth(true);
                                                
                                        //     }
                                        //     else{
                                        //         alert('Incorrect OTP');
                                        //         return;
                                        //     }
                                        //   })
                                        //   .catch(error => {
                                        //     console.error(error);
                                        //   });
                                    }}
                                >
                                    Submit OTP
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            }
        </Paper>
    </div>
  );
};
export default GoldLoanForm;
