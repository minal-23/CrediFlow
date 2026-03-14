import React, { useContext, useState } from 'react';
import { Container, Paper, Typography, Grid, TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import './GoldLoanStyle'
import axios from 'axios';
import UserContext from '../../context/notes/UserContext';

const GoldLoanUpload = () => {

  const [salary, setsalary] = React.useState(0);
  const [borrow, setborrow] = useState(0);
  const navigate = useNavigate();
  const {email} = useContext(UserContext);

  const initialValues = {
    // Initialize Section 1 field values here
    firstName: '',
    secondName: '',
    aadhaarNumber: '',
    panNumber: '',

    // Initialize Section 2 field values here
    loanAmount: '',
    tenure: '10',

    // Initialize Section 3 field values here
    aadhaarCard: null,
    panCard: null,
    poa:null,
    photo:null,
    assayCertificate:null
  };

  const validationSchema = Yup.object().shape({
     // Validation schema for Section 1 fields
     firstName: Yup.string()
     .required('First Name is required')
     .matches(/^[A-Za-z]+$/, 'Only characters A-Z or a-z are allowed'),
    lastName: Yup.string()
     .required('Second Name is required')
     .matches(/^[A-Za-z]+$/, 'Only characters A-Z or a-z are allowed'),
   aadhaarNumber: Yup.string()
     .required('Aadhaar Number is required')
     .matches(/^\d{12}$/, 'Aadhaar Number must be 12 digits'),
   panNumber: Yup.string()
     .required('PAN Number is required')
     .matches(/^[A-Z]{5}[0-9]{4}[A-Z]$/, 'Invalid PAN format'),

    //For Section 2  
    loanAmount: Yup.number()
      .required('Loan Amount is required')
      .positive('Loan amount must be a positive number')
      .integer('Loan amount must be a whole number')
      .max(200000, 'Loan amount should be less than eligible amount'),
    tenure: Yup.number()
      .required('Tenure is required')
      .positive('Tenure must be a positive number')
      .integer('Tenure must be a whole number')
      .min(10, 'Minimum tenure is 10 months')
      .max(48, 'Maximum tenure is 48 months'),

    //For Section 3  
    aadhaarCard: Yup.mixed()
      .required('Aadhaar Document is required')
      .test('file-type', 'Invalid file format. Only PDF files are allowed.', (value) => {
        return value && value.type === 'application/pdf';
      }),
    panCard: Yup.mixed()
      .required('PAN Document is required')
      .test('file-type', 'Invalid file format. Only PDF files are allowed.', (value) => {
        return value && value.type === 'application/pdf';
      }),
      addressProof: Yup.mixed()
      .required('Proof of Address is required-Passport or Utility Bills')
      .test('file-type', 'Invalid file format. Only PDF files are allowed.', (value) => {
        return value && value.type === 'application/pdf';
      }),
   
    photo: Yup.mixed()
      .required('Recent passport size photograph is required')
      .test('file-type', 'Invalid file format. Only PDF files are allowed.', (value) => {
        return value && value.type === 'application/pdf';
      }),
    assayCertificate: Yup.mixed()
      .required('Purity Certificate of the gold to be pledged is required')
      .test('file-type', 'Invalid file format. Only PDF files are allowed.', (value) => {
        return value && value.type === 'application/pdf';
      }),
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      values = {
        ...values,
        emi: ((parseFloat(formik.values.loanAmount) * (10.49/1200) * Math.pow((1+(10.49/1200)), parseFloat(formik.values.tenure))) / (Math.pow((1+(10.49/1200)), parseFloat(formik.values.tenure)) -1)),
        email: localStorage.getItem("userEmail")
      }
      console.log(values);
      axios.post('http://localhost:8765/api/v2/loan/gold/docs/upload', values, {
        headers: {"Content-Type": "multipart/form-data"}
      })
      .then(response => {
        console.log(response);
      })
      alert('Successfully submitted loan request');
      navigate('/home');
    },
  });

  return (
    <div style={{ paddingTop: '75px', paddingBottom:'30px', background: 'linear-gradient(to right, #8e44ad, transparent)' }}>
    <Grid container>
      <Grid item sx={{ position: 'fixed', width: '100%', backgroundColor: '#8F00FF', color: 'white', padding: 2, zIndex: 999 }}>
        <Typography variant='h5'><strong>Rate of Interest: 9.50%</strong></Typography>
        <Typography variant='h6'>For {formik.values.grams} grams of gold to be pledged you can avail a loan of Rs.{borrow}* </Typography>
        <Typography variant='h6'>Loan Amount Calculated at Rs. 4019.25/gm* </Typography>
        <Typography variant='body1'>* The rates shown are just an estimation and  is subject to variation</Typography>
      </Grid>
      <Grid item xs={12} sx={{ paddingTop: '200px' }}>
        <Container>
        <form onSubmit={formik.handleSubmit}>
          <Paper elevation={5} className='paper-form'>
            <Typography variant="h5" gutterBottom style={{ marginTop: '20px', paddingBottom:'20px' }}>
              Section 1: Personal Details
            </Typography>
            <Grid container spacing={2}>
              {/* First Name */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  helperText={formik.touched.firstName && formik.errors.firstName}
                />
              </Grid>

              {/* Second Name */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="lastName"
                  name="lastName"
                  label="Second Name"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Grid>

              {/* Aadhaar Number */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="aadhaarNumber"
                  name="aadhaarNumber"
                  label="Aadhaar Number"
                  value={formik.values.aadhaarNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.aadhaarNumber && Boolean(formik.errors.aadhaarNumber)}
                  helperText={formik.touched.aadhaarNumber && formik.errors.aadhaarNumber}
                />
              </Grid>

              {/* PAN Number */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="panNumber"
                  name="panNumber"
                  label="PAN Number"
                  value={formik.values.panNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.panNumber && Boolean(formik.errors.panNumber)}
                  helperText={formik.touched.panNumber && formik.errors.panNumber}
                />
              </Grid>

              {/* Address Pincode */}
             
            </Grid>
          </Paper>

          <Paper elevation={4} className='paper-form'>
            <Typography variant="h5" gutterBottom style={{ marginTop: '20px', paddingBottom:'20px' }}>
              Section 2: Loan Information
            </Typography>

            {/* Section 2 Fields */}
            <Grid container spacing={2}>
              {/* Salary Per Month */}

              {/* Gold Weight */}
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="grams"
                  name="grams"
                  label="Grams of Gold"
                  type="number"
                  value={formik.values.grams}
                  onChange={(e) => { formik.handleChange(e); 
                    const amt=e.target.value;
                    setborrow(amt * 4019.25)}}
                  onBlur={formik.handleBlur}
                  error={formik.touched.tenure && Boolean(formik.errors.tenure)}
                  helperText={formik.touched.tenure && formik.errors.tenure}
                />
              </Grid>
              {/* Tenure */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="tenure"
                  name="tenure"
                  label="Tenure"
                  type="number"
                  value={formik.values.tenure}
                  onChange={(e) => { formik.handleChange(e)}}
                  onBlur={formik.handleBlur}
                  error={formik.touched.tenure && Boolean(formik.errors.tenure)}
                  helperText={formik.touched.tenure && formik.errors.tenure}
                />
              </Grid>

              {/* Loan Amount */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="loanAmount"
                  name="loanAmount"
                  label="Loan Amount"
                  type="number"
                  //disabled={!(formik.values.monthlyExpenses && formik.values.salaryPerMonth && formik.values.tenure)}
                  value={formik.values.loanAmount}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.loanAmount && Boolean(formik.errors.loanAmount)}
                  helperText={formik.touched.loanAmount && formik.errors.loanAmount}
                />
              </Grid>
            </Grid>
          </Paper>


          <Paper elevation={3} className='paper-form'>
            <Typography variant="h5" gutterBottom style={{ marginTop: '20px', paddingBottom:'20px' }}>
              Section 3: Document Uploads
            </Typography>

            {/* Section 3 Fields */}
            <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
              {/* Aadhaar Card PDF */}
              <Grid item xs={12} md={6}>
                <input
                  type="file"
                  id="aadhaarCard"
                  name="aadhaarCard"
                  accept=".pdf"
                  style={{ display: 'none' }}
                  onChange={(event) =>
                    formik.setFieldValue('aadhaarCard', event.currentTarget.files[0])
                  }
                />
                <label htmlFor="aadhaarCard">
                  <Button
                    variant="contained"
                    component="span"
                    style={formik.values.aadhaarCard ? { backgroundColor: 'green' } : { backgroundColor: 'red' }}
                    fullWidth
                    startIcon={<CloudUploadIcon />}
                  >
                    {formik.values.aadhaarCard ? 'Uploaded Aadhaar Card' : 'Upload Aadhaar Card PDF'}
                  </Button>
                </label>
              </Grid>

              {/* PAN Card PDF */}
              <Grid item xs={12} md={6}>
                <input
                  type="file"
                  id="panCard"
                  name="panCard"
                  accept=".pdf"
                  style={{ display: 'none' }}
                  onChange={(event) =>
                    formik.setFieldValue('panCard', event.currentTarget.files[0])
                  }
                />
                <label htmlFor="panCard">
                  <Button
                    variant="contained"
                    component="span"
                    style={formik.values.panCard ? { backgroundColor: 'green' } : { backgroundColor: 'red' }}
                    fullWidth
                    startIcon={<CloudUploadIcon />}
                  >
                    {formik.values.panCard ? 'Uploaded PAN Card' : 'Upload PAN Card'}
                  </Button>
                </label>
              </Grid>

       

              {/* Address Proof PDF */}
              <Grid item xs={12} md={6}>
                <input
                  type="file"
                  id="addressProof"
                  name="addressProof"
                  accept=".pdf"
                  style={{ display: 'none' }}
                  onChange={(event) =>
                    formik.setFieldValue('addressProof', event.currentTarget.files[0])
                  }
                />
                <label htmlFor="addressProof">
                  <Button
                    variant="contained"
                    component="span"
                    style={formik.values.addressProof ? { backgroundColor: 'green' } : { backgroundColor: 'red' }}
                    fullWidth
                    startIcon={<CloudUploadIcon />}
                  >
                    {formik.values.addressProof ? 'Uploaded Address Proof' : 'Upload Address Proof'}
                  </Button>
                </label>
              </Grid>

              {/* Bank Statements PDF */}
     

              {/* Salary Slips PDF */}
              {/*photo*/}
              <Grid item xs={12} md={6}>
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  accept=".pdf"
                  style={{ display: 'none' }}
                  onChange={(event) =>
                    formik.setFieldValue('photo', event.currentTarget.files[0])
                  }
                />
                <label htmlFor="photo">
                  <Button
                    variant="contained"
                    component="span"
                    style={formik.values.photo ? { backgroundColor: 'green' } : { backgroundColor: 'red' }}
                    fullWidth
                    startIcon={<CloudUploadIcon />}
                  >
                    {formik.values.photo ? 'Uploaded Photograph' : 'Upload Photograph'}
                  </Button>
                </label>
              </Grid>
              {/* assayCertificate */}
              <Grid item xs={12} md={6}>
                <input
                  type="file"
                  id="assayCertificate"
                  name="assayCertificate"
                  accept=".pdf"
                  style={{ display: 'none' }}
                  onChange={(event) =>
                    formik.setFieldValue('assayCertificate', event.currentTarget.files[0])
                  }
                />
                <label htmlFor="assayCertificate">
                  <Button
                    variant="contained"
                    component="span"
                    style={formik.values.assayCertificate ? { backgroundColor: 'green' } : { backgroundColor: 'red' }}
                    fullWidth
                    startIcon={<CloudUploadIcon />}
                  >
                    {formik.values.assayCertificate ? 'Uploaded Assay Certificate' : 'Upload Assay Certificate'}
                  </Button>
                </label>
              </Grid>
            
            </Grid>
          </Paper>

          <Button
            type="submit"
            variant="contained"
            disabled={!formik.isValid || formik.isSubmitting}
            fullWidth
            style={{ marginTop: '20px' }}
          >
            Submit
          </Button>
        </form>
       </Container> 
      </Grid>

    </Grid>
  </div>
  );
};

export default GoldLoanUpload;
