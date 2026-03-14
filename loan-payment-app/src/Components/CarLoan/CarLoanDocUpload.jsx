// src/CarLoanForm.js
import React,{useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Container, Paper, Typography, Grid, TextField, Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const CarLoanDocUpload = () => {
    const [emi, setemi] = useState(0);
    const navigate = useNavigate();
    const initialValues = {
    // Personal Details
    firstName: '',
    middleName:'',
    lastName:'',
    aadhar:'',
    PAN:'',
    
    //Loan Information
    loanAmt:'',
    tenure:'',
    monthlyIncome:'',
    monthlyExpense:'',
    
    //Document uploads
    
    panCard: null,
    aadharCard: null,
    incomeProof: null,
    bankStatement: null,
    drivingLicense: null,
  
    };

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('Required')
        // .required('First Name is required')
        // .matches(/^[A-Za-z]+$/, 'Only characters A-Z or a-z are allowed'),
      ,
        middleName: Yup.string(),
      //   .required('Second Name is required')
      //   .matches(/^[A-Za-z]+$/, 'Only characters A-Z or a-z are allowed'),
        lastName: Yup.string().required('Required'),
        // .required('Second Name is required')
        // .matches(/^[A-Za-z]+$/, 'Only characters A-Z or a-z are allowed'),
        aadhar: Yup.string().required('Required'),
      //   .required('Aadhaar Number is required')
      // .matches(/^\d{12}$/, 'Aadhaar Number must be 12 digits'),
        PAN: Yup.string().required('Required'),
  
        monthlyIncome: Yup.number()
        .required('Salary per Month is required')
        .positive('Salary must be a positive number')
        .integer('Salary must be a whole number'),

        monthlyExpense: Yup.number()
        .required('Monthly Expenses are required')
        .positive('Expenses must be a positive number')
        .integer('Expenses must be a whole number'),
     
        
        loanAmt: Yup.number()
        .required('Loan Amount is required')
        .positive('Loan amount must be a positive number')
        .min(100000,'Minimum loan amount is 100000')
        .max(10000000,'Maximum loan amount is 10000000'),
        
        tenure: Yup.number()
        .required('Tenure is required')
        .positive('Tenure must be a positive number')
        .integer('Tenure must be a whole number')
        .min(10, 'Minimum tenure is 10 months')
        .max(84, 'Maximum tenure is 84 months or 7 years'),

        panCard: Yup.mixed()
        .test('file-type', 'Invalid file format. Only PDF files are allowed.', (value) => {
          return !value || (value.type === 'application/pdf');
        }),
        
        aadharCard: Yup.mixed()
            .test('file-type', 'Invalid file format. Only image or PDF files are allowed.', (value) => {
            return !value || (value.type === 'image/jpeg' || value.type === 'image/png' || value.type === 'application/pdf');
            }),
        incomeProof: Yup.mixed()
            .test('file-type', 'Invalid file format. Only PDF files are allowed.', (value) => {
            return !value || (value.type === 'application/pdf');
            }),
        bankStatement: Yup.mixed()
            .test('file-type', 'Invalid file format. Only PDF files are allowed.', (value) => {
            return !value || (value.type === 'application/pdf');
            }),
        drivingLicense: Yup.mixed()
            .test('file-type', 'Invalid file format. Only image or PDF files are allowed.', (value) => {
            return !value || (value.type === 'image/jpeg' || value.type === 'image/png' || value.type === 'application/pdf');
            }),
        });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            values = {
              ...values,
              emi: (parseFloat(formik.values.loanAmount)/parseFloat(formik.values.tenure)).toFixed(2)
            }
            axios.post('http://localhost:8765/api/v1/loan/car/data', values, {
              headers: {"Content-Type": "multipart/form-data"}
            })
            .then(response => {
              console.log(response);
            })
            alert('Successfully submitted loan request');
            console.log("Collected values:",values)
            navigate('/home/myloans')
      
          },
    
        
      });
  
    return (
        <div>
        <Grid item xs={12} sx={{ paddingTop: '200px' }}>
          <Container>
          <form onSubmit={formik.handleSubmit}>
            <Paper elevation={5} className='paper-form'>
              <Typography variant="h5" gutterBottom style={{ marginTop: '20px', paddingBottom:'20px' }}>
                Section 1: Personal Details
              </Typography>
              
                <Grid container spacing={2}>
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
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                id="middleName"
                                name="middleName"
                                label="Middle Name"
                                value={formik.values.secondName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.middleName && Boolean(formik.errors.middleName)}
                                helperText={formik.touched.middleName && formik.errors.middleName}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                id="lastName"
                                name="lastName"
                                label="Last Name"
                                value={formik.values.secondName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                helperText={formik.touched.lastName && formik.errors.lastName}
                            />
                        </Grid>
                
                        <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            id="aadhar"
                            name="aadhar"
                            label="Aadhaar Number"
                            value={formik.values.aadhaarNumber}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.aadhar && Boolean(formik.errors.aadhar)}
                            helperText={formik.touched.aadhar && formik.errors.aadhar}
                        />
                        </Grid>

                {/* PAN Number */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    id="PAN"
                    name="PAN"
                    label="PAN Number"
                    value={formik.values.panNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.PAN && Boolean(formik.errors.PAN)}
                    helperText={formik.touched.PAN && formik.errors.PAN}
                  />
                </Grid>
                        {/* <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="Second Name"
                                name="secondName"
                                variant="outlined"
                                autoComplete="off"
                            />
                            <ErrorMessage name="secondName" component="div" className="error" />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="Aadhar"
                                name="aadhar"
                                variant="outlined"
                                autoComplete="off"
                            />
                            <ErrorMessage name="aadhar" component="div" className="error" />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="PAN"
                                name="PAN"
                                variant="outlined"
                                autoComplete="off"
                            />
                            <ErrorMessage name="PAN" component="div" className="error" />
                        </Grid> */}
                        
                    </Grid>
            </Paper> 
            <Paper elevation={3} className='paper-form'>
            <Typography variant="h5" gutterBottom style={{ marginTop: '20px', paddingBottom:'20px' }}>
                Section 2: Loan Information 
              </Typography>
              <Grid container spacing={2}>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="monthlyIncome"
                  name="monthlyIncome"
                  label="Monthly Income"
                  type="number"
                  value={formik.values.monthlyIncome}
                  onChange={(e) => { formik.handleChange(e)}}
                  onBlur={formik.handleBlur}
                  error={formik.touched.monthlyIncome && Boolean(formik.errors.monthlyIncome)}
                  helperText={formik.touched.monthlyIncome && formik.errors.monthlyIncome}
                />
              </Grid>

             
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="monthlyExpense"
                  name="monthlyExpense"
                  label="Monthly Expense"
                  type="number"
                  value={formik.values.monthlyExpense}
                  onChange={(e) => { formik.handleChange(e);  }}
                  onBlur={formik.handleBlur}
                  error={formik.touched.monthlyExpense && Boolean(formik.errors.monthlyExpense)}
                  helperText={formik.touched.monthlyExpense && formik.errors.monthlyExpense}
                />
              </Grid>

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
                  id="loanAmt"
                  name="loanAmt"
                  label="Loan Amount"
                  type="number"
                //   disabled={!(formik.values.monthlyExpense && formik.values.salaryPerMonth && formik.values.tenure)}
                  value={formik.values.loanAmt}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.loanAmt && Boolean(formik.errors.loanAmt)}
                  helperText={formik.touched.loanAmt && formik.errors.loanAmt}
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
                <Grid item xs={12} md={6}>
            {/* Aadhar Card */}
            <input
                type="file"
                id="aadharCard"
                name="aadharCard"
                accept=".pdf, .jpg, .jpeg, .png"
                style={{ display: 'none' }}
                onChange={(event) =>
                formik.setFieldValue('aadharCard', event.currentTarget.files[0])
                }
            />
            <label htmlFor="aadharCard">
                <Button
                variant="contained"
                component="span"
                style={formik.values.aadharCard ? { backgroundColor: 'green' } : { backgroundColor: 'red' }}
                fullWidth
                startIcon={<CloudUploadIcon />}
                >
                {formik.values.aadharCard ? 'Uploaded Aadhar Card' : 'Upload Aadhar Card'}
                </Button>
            </label>
            </Grid>
            <Grid item xs={12} md={6}>
            {/* Income Proof */}
            <input
                type="file"
                id="incomeProof"
                name="incomeProof"
                accept=".pdf"
                style={{ display: 'none' }}
                onChange={(event) =>
                formik.setFieldValue('incomeProof', event.currentTarget.files[0])
                }
            />
            <label htmlFor="incomeProof">
                <Button
                variant="contained"
                component="span"
                style={formik.values.incomeProof ? { backgroundColor: 'green' } : { backgroundColor: 'red' }}
                fullWidth
                startIcon={<CloudUploadIcon />}
                >
                {formik.values.incomeProof ? 'Uploaded Income Proof' : 'Upload Income Proof'}
                </Button>
            </label>
            </Grid>
            <Grid item xs={12} md={6}>
            {/* Bank Statement */}
            <input
                type="file"
                id="bankStatement"
                name="bankStatement"
                accept=".pdf"
                style={{ display: 'none' }}
                onChange={(event) =>
                formik.setFieldValue('bankStatement', event.currentTarget.files[0])
                }
            />
            <label htmlFor="bankStatement">
                <Button
                variant="contained"
                component="span"
                style={formik.values.bankStatement ? { backgroundColor: 'green' } : { backgroundColor: 'red' }}
                fullWidth
                startIcon={<CloudUploadIcon />}
                >
                {formik.values.bankStatement ? 'Uploaded Bank Statement' : 'Upload Bank Statement'}
                </Button>
            </label>
            </Grid>
            <Grid item xs={12} md={6}>
            {/* Permanent Driving License */}
            <input
                type="file"
                id="drivingLicense"
                name="drivingLicense"
                accept=".pdf, .jpg, .jpeg, .png"
                style={{ display: 'none' }}
                onChange={(event) =>
                formik.setFieldValue('drivingLicense', event.currentTarget.files[0])
                }
            />
            <label htmlFor="drivingLicense">
                <Button
                variant="contained"
                component="span"
                style={formik.values.drivingLicense ? { backgroundColor: 'green' } : { backgroundColor: 'red' }}
                fullWidth
                startIcon={<CloudUploadIcon />}
                >
                {formik.values.drivingLicense ? 'Uploaded Driving License' : 'Upload Driving License'}
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

      </div>
            
 )
};


export default CarLoanDocUpload;






