import React, { useContext, useState } from 'react';
import { Container, Paper, Typography, Grid, TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import './PersonalLoadUpload.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../../context/notes/UserContext';

const PersonalLoanUpload = () => {

  const [salary, setsalary] = React.useState(0);
  const [eligibleLoan, seteligibleLoan] = useState(0);
  const [emi, setemi] = useState(0);
  const navigate = useNavigate();
  const {email} = useContext(UserContext);

  const initialValues = {
    // Initialize Section 1 field values here
    firstName: '',
    lastName: '',
    aadhaarNumber: '',
    panNumber: '',
    addressPincode: '',

    // Initialize Section 2 field values here
    salaryPerMonth: '',
    monthlyExpenses: '',
    loanAmount: '',
    tenure: '10',

    // Initialize Section 3 field values here
    aadhaarCard: null,
    panCard: null,
    signatureProof: null,
    addressProof: null,
    bankStatements: null,
    salarySlips: null,
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
    addressPincode: Yup.string()
      .required('Address Pincode is required')
      .matches(/^\d{6}$/, 'Pincode must be 6 digits'),

    //For Section 2  
    salaryPerMonth: Yup.number()
      .required('Salary per Month is required')
      .positive('Salary must be a positive number')
      .integer('Salary must be a whole number'),
    monthlyExpenses: Yup.number()
      .required('Monthly Expenses are required')
      .positive('Expenses must be a positive number')
      .integer('Expenses must be a whole number')
      .max(salary, 'Expenses should be less than salary per month'),
    loanAmount: Yup.number()
      .required('Loan Amount is required')
      .positive('Loan amount must be a positive number')
      .integer('Loan amount must be a whole number')
      .max(eligibleLoan, 'Loan amount should be less than eligible amount'),
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
    signatureProof: Yup.mixed()
      .required('Signature Proof is required')
      .test('file-type', 'Invalid file format. Only PDF files are allowed.', (value) => {
        return value && value.type === 'application/pdf';
      }),
    addressProof: Yup.mixed()
      .required('Address Proof is required')
      .test('file-type', 'Invalid file format. Only PDF files are allowed.', (value) => {
        return value && value.type === 'application/pdf';
      }),
    bankStatements: Yup.mixed()
      .required('Bank Statements are required')
      .test('file-type', 'Invalid file format. Only PDF files are allowed.', (value) => {
        return value && value.type === 'application/pdf';
      }),
    salarySlips: Yup.mixed()
      .required('Salary Slips are required')
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
      
      axios.post('http://localhost:8765/api/v1/loan/personal/docs/upload', values, {
        headers: {"Content-Type": "multipart/form-data"}
      })
      .then(response => {
        console.log(response);
      })
      .catch(e => console.log(e));
      alert('Successfully submitted loan request');
      navigate('/home');
    },
  });

  const formula = (e) => {
    // seteligibleLoan(parseInt(e.target.value) + parseInt(salary));
    seteligibleLoan((parseFloat(salary) - parseFloat(e.target.value))*10);
  }

  return (
    <div style={{ paddingTop: '75px', paddingBottom:'30px', background: 'linear-gradient(to right, #8e44ad, transparent)' }}>
      <Grid container>
        <Grid item sx={{ position: 'fixed', width: '100%', backgroundColor: '#8F00FF', color: 'white', padding: 2, zIndex: 999 }}>
          <Typography variant='h5'><strong>Rate of Interest: 10.49%</strong></Typography>
          <Typography variant='h6'>Eligible for Loan Amount of Rs.{eligibleLoan} for tenure of {formik.values.tenure} months</Typography>
          <Typography variant='h7'>Loan: Rs.{formik.values.loanAmount} @ EMI {((parseFloat(formik.values.loanAmount) * (10.49/1200) * Math.pow((1+(10.49/1200)), parseFloat(formik.values.tenure))) / (Math.pow((1+(10.49/1200)), parseFloat(formik.values.tenure)) -1)).toFixed(3)}</Typography>
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
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="addressPincode"
                    name="addressPincode"
                    label="Address Pincode"
                    value={formik.values.addressPincode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.addressPincode && Boolean(formik.errors.addressPincode)}
                    helperText={formik.touched.addressPincode && formik.errors.addressPincode}
                  />
                </Grid>
              </Grid>
            </Paper>

            <Paper elevation={4} className='paper-form'>
              <Typography variant="h5" gutterBottom style={{ marginTop: '20px', paddingBottom:'20px' }}>
                Section 2: Loan Information
              </Typography>

              {/* Section 2 Fields */}
              <Grid container spacing={2}>
                {/* Salary Per Month */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    id="salaryPerMonth"
                    name="salaryPerMonth"
                    label="Salary Per Month"
                    type="number"
                    value={formik.values.salaryPerMonth}
                    onChange={(e) => { formik.handleChange(e); setsalary(e.target.value);}}
                    onBlur={formik.handleBlur}
                    error={formik.touched.salaryPerMonth && Boolean(formik.errors.salaryPerMonth)}
                    helperText={formik.touched.salaryPerMonth && formik.errors.salaryPerMonth}
                  />
                </Grid>

                {/* Monthly Expenses */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    id="monthlyExpenses"
                    name="monthlyExpenses"
                    label="Monthly Expenses"
                    type="number"
                    value={formik.values.monthlyExpenses}
                    onChange={(e) => { formik.handleChange(e); formula(e); }}
                    onBlur={formik.handleBlur}
                    error={formik.touched.monthlyExpenses && Boolean(formik.errors.monthlyExpenses)}
                    helperText={formik.touched.monthlyExpenses && formik.errors.monthlyExpenses}
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
                    onChange={(e) => { formik.handleChange(e);}}
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
                    disabled={!(formik.values.monthlyExpenses && formik.values.salaryPerMonth && formik.values.tenure)}
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

                {/* Signature Proof PDF */}
                <Grid item xs={12} md={6}>
                  <input
                    type="file"
                    id="signatureProof"
                    name="signatureProof"
                    accept=".pdf"
                    style={{ display: 'none' }}
                    onChange={(event) =>
                      formik.setFieldValue('signatureProof', event.currentTarget.files[0])
                    }
                  />
                  <label htmlFor="signatureProof">
                    <Button
                      variant="contained"
                      component="span"
                      style={formik.values.signatureProof ? { backgroundColor: 'green' } : { backgroundColor: 'red' }}
                      fullWidth
                      startIcon={<CloudUploadIcon />}
                    >
                      {formik.values.signatureProof ? 'Uploaded Signature Proof' : 'Upload Signature Proof'}
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
                <Grid item xs={12} md={6}>
                  <input
                    type="file"
                    id="bankStatements"
                    name="bankStatements"
                    accept=".pdf"
                    style={{ display: 'none' }}
                    onChange={(event) =>
                      formik.setFieldValue('bankStatements', event.currentTarget.files[0])
                    }
                  />
                  <label htmlFor="bankStatements">
                    <Button
                      variant="contained"
                      component="span"
                      style={formik.values.bankStatements ? { backgroundColor: 'green' } : { backgroundColor: 'red' }}
                      fullWidth
                      startIcon={<CloudUploadIcon />}
                    >
                      {formik.values.bankStatements ? 'Uploaded Bank Statements' : 'Upload Bank Statements'}
                    </Button>
                  </label>
                </Grid>

                {/* Salary Slips PDF */}
                <Grid item xs={12} md={6}>
                  <input
                    type="file"
                    id="salarySlips"
                    name="salarySlips"
                    accept=".pdf"
                    style={{ display: 'none' }}
                    onChange={(event) =>
                      formik.setFieldValue('salarySlips', event.currentTarget.files[0])
                    }
                  />
                  <label htmlFor="salarySlips">
                    <Button
                      variant="contained"
                      component="span"
                      style={formik.values.salarySlips ? { backgroundColor: 'green' } : { backgroundColor: 'red' }}
                      fullWidth
                      startIcon={<CloudUploadIcon />}
                    >
                      {formik.values.salarySlips ? 'Uploaded Salary Slips' : 'Upload Salary Slips'}
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

export default PersonalLoanUpload;
