import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import validator from 'validator';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Link,
} from '@mui/material';
import axios from 'axios';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  aadharNumber: Yup.string()
    .matches(/^\d{12}$/, 'Aadhar Number must be 12 digits')
    .required('Aadhar Number is required'),
  mobileNumber: Yup.string()
    .matches(/^[6-9]\d{9}$/, 'Mobile Number must be 10 digits starting with 6-9')
    .required('Mobile Number is required'),
  dob: Yup.date().required('Date of Birth is required'),
  addressLine1: Yup.string().required('Address Line 1 is required'),
  state: Yup.string().required('State is required'),
  city: Yup.string().required('City is required'),
  postalCode: Yup.string()
    .matches(/^\d{6}$/, 'Postal code must be 6 digits')
    .required('Postal Code is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
      'Password must be at least 8 characters with 1 uppercase, 1 lowercase, 1 digit, and 1 special character'
    )
    .required('Password is required'),
});

const initialValues = {
  firstName: '',
  middleName: '',
  lastName: '',
  aadharNumber: '',
  mobileNumber: '',
  dob: null,
  addressLine1: '',
  addressLine2: '',
  addressLine3: '',
  state: '',
  city: '',
  postalCode: '',
  email: '',
  password: '',
};

const styles = {
  styling: {
    border: '1px solid #5a287d',
    borderRadius: '20px',
    padding: '20px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    fontFamily: 'sans-serif',
    margin: '20px',
  },
  textCenter: {
    color: '#5a287d',
    fontFamily: 'sans-serif',
    padding: '20px',
  },
  button: {
    backgroundColor: '#6824a3',
    color: 'white',
    border: 'none',
    margin: '20px',
    padding: '10px 20px',
  },
  buttonHover: {
    backgroundColor: '#5a287d',
  },
  formLabel: {
    fontWeight: 'bold',
    paddingRight: '10px',
  },
  formControl: {
    borderRadius: '5px',
    padding: '10px',
  },
  p: {
    padding: '10px',
  },
  link: {
    color: '#6824a3 !important',
    textDecoration: 'none !important',
  },
  linkHover: {
    color: '#5a287d !important',
    textDecoration: 'underline !important',
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
    marginLeft: '340px',
  },
  centerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const RegisterMui = () => {
  const navigate = useNavigate();

  const defaultTheme = createTheme();

  const handleSubmit = (values) => {

    console.log('Form data submitted:', values);
    axios.post('http://localhost:8765/api/v1/users/register', values)
      .then(response => {
        if (!response.data) {
          alert('Email ID already exists');
        } else {
          alert('Successfully registered!');
          navigate('/login');
        }
      })
      .catch(e => console.log(e));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="div" maxWidth="md" style={{ paddingTop: '80px' }}>
        <CssBaseline />
        <div style={styles.styling}>
          <div style={styles.centerContainer}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h4" align="center" style={styles.textCenter}>
              Sign Up
            </Typography>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, setFieldValue, touched }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="First Name *"
                      name="firstName"
                      value={values.firstName}
                      onChange={(e) => setFieldValue('firstName', e.target.value)}
                      error={errors.firstName && touched.firstName}
                      helperText={errors.firstName && touched.firstName && errors.firstName}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Middle Name"
                      name="middleName"
                      value={values.middleName}
                      onChange={(e) => setFieldValue('middleName', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Last Name *"
                      name="lastName"
                      value={values.lastName}
                      onChange={(e) => setFieldValue('lastName', e.target.value)}
                      error={errors.lastName && touched.lastName}
                      helperText={errors.lastName && touched.lastName && errors.lastName}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Aadhar Number *"
                      type="text"
                      name="aadharNumber"
                      value={values.aadharNumber}
                      onChange={(e) => setFieldValue('aadharNumber', e.target.value)}
                      fullWidth
                      variant="outlined"
                      error={errors.aadharNumber && touched.aadharNumber}
                      helperText={errors.aadharNumber && touched.aadharNumber && errors.aadharNumber}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Mobile Number *"
                      name="mobileNumber"
                      value={values.mobileNumber}
                      onChange={(e) => setFieldValue('mobileNumber', e.target.value)}
                      error={errors.mobileNumber && touched.mobileNumber}
                      helperText={errors.mobileNumber && touched.mobileNumber && errors.mobileNumber}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <DatePicker
                      selected={values.dob}
                      onChange={(date) => setFieldValue('dob', date)}
                      placeholderText="Select a date"
                      name="dob"
                      scrollableYearDropdown={true}
                      yearDropdownItemNumber={115}
                      minDate={new Date('01/01/1902')}
                      maxDate={new Date()}
                      showYearDropdown
                      dateFormat="dd/MM/yyyy"
                      customInput={
                        <TextField fullWidth label="Date of Birth *" error={errors.dob} />
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Address Line 1 *"
                      name="addressLine1"
                      value={values.addressLine1}
                      onChange={(e) => setFieldValue('addressLine1', e.target.value)}
                      error={errors.addressLine1 && touched.addressLine1}
                      helperText={errors.addressLine1 && touched.addressLine1 && errors.addressLine1}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Address Line 2"
                      name="addressLine2"
                      value={values.addressLine2}
                      onChange={(e) => setFieldValue('addressLine2', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth error={errors.state && touched.state}>
                      <InputLabel>State *</InputLabel>
                      <Select
                        name="state"
                        value={values.state}
                        onChange={(e) => setFieldValue('state', e.target.value)}
                      >
                        <MenuItem value="">
                          <em>Select State</em>
                        </MenuItem>
                        <MenuItem value="AN">Andaman and Nicobar Islands</MenuItem>
                        <MenuItem value="AP">Andhra Pradesh</MenuItem>
                        <MenuItem value="AR">Arunachal Pradesh</MenuItem>
                        <MenuItem value="AS">Assam</MenuItem>
                        <MenuItem value="BR">Bihar</MenuItem>
                        <MenuItem value="CH">Chandigarh</MenuItem>
                        <MenuItem value="CT">Chhattisgarh</MenuItem>
                        <MenuItem value="DN">Dadra and Nagar Haveli</MenuItem>
                        <MenuItem value="DD">Daman and Diu</MenuItem>
                        <MenuItem value="DL">Delhi</MenuItem>
                        <MenuItem value="GA">Goa</MenuItem>
                        <MenuItem value="GJ">Gujarat</MenuItem>
                        <MenuItem value="HR">Haryana</MenuItem>
                        <MenuItem value="HP">Himachal Pradesh</MenuItem>
                        <MenuItem value="JK">Jammu and Kashmir</MenuItem>
                        <MenuItem value="JH">Jharkhand</MenuItem>
                        <MenuItem value="KA">Karnataka</MenuItem>
                        <MenuItem value="KL">Kerala</MenuItem>
                        <MenuItem value="LA">Ladakh</MenuItem>
                        <MenuItem value="LD">Lakshadweep</MenuItem>
                        <MenuItem value="MP">Madhya Pradesh</MenuItem>
                        <MenuItem value="MH">Maharashtra</MenuItem>
                        <MenuItem value="MN">Manipur</MenuItem>
                        <MenuItem value="ML">Meghalaya</MenuItem>
                        <MenuItem value="MZ">Mizoram</MenuItem>
                        <MenuItem value="NL">Nagaland</MenuItem>
                        <MenuItem value="OR">Odisha</MenuItem>
                        <MenuItem value="PY">Puducherry</MenuItem>
                        <MenuItem value="PB">Punjab</MenuItem>
                        <MenuItem value="RJ">Rajasthan</MenuItem>
                        <MenuItem value="SK">Sikkim</MenuItem>
                        <MenuItem value="TN">Tamil Nadu</MenuItem>
                        <MenuItem value="TG">Telangana</MenuItem>
                        <MenuItem value="TR">Tripura</MenuItem>
                        <MenuItem value="UP">Uttar Pradesh</MenuItem>
                        <MenuItem value="UT">Uttarakhand</MenuItem>
                        <MenuItem value="WB">West Bengal</MenuItem>
                      </Select>
                      {errors.state && touched.state && (
                        <FormHelperText>{errors.state}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="City *"
                      name="city"
                      value={values.city}
                      onChange={(e) => setFieldValue('city', e.target.value)}
                      error={errors.city && touched.city}
                      helperText={errors.city && touched.city && errors.city}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Postal Code *"
                      name="postalCode"
                      value={values.postalCode}
                      onChange={(e) => setFieldValue('postalCode', e.target.value)}
                      error={errors.postalCode && touched.postalCode}
                      helperText={errors.postalCode && touched.postalCode && errors.postalCode}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Country"
                      name="country"
                      value="India"
                      readOnly
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email Address *"
                      name="email"
                      value={values.email}
                      onChange={(e) => setFieldValue('email', e.target.value)}
                      error={errors.email && touched.email}
                      helperText={errors.email && touched.email && errors.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Password *"
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={(e) => setFieldValue('password', e.target.value)}
                      error={errors.password && touched.password}
                      helperText={errors.password && touched.password && errors.password}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{
                    ...styles.button,
                    ...(errors.password ? styles.buttonHover : null),
                  }}
                >
                  Sign Up
                </Button>
                <Typography variant="body2" align="center" style={styles.p}>
                  Already have an account?{' '}
                  <Link onClick={() => navigate('/login')} variant="body2">
                    Sign in
                  </Link>
                </Typography>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    </ThemeProvider>
  );
};

export default RegisterMui;
