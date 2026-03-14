import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Box, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from "yup";

export default function BankinfoForm(props) {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
      country: ""
    },
    onSubmit: values => {
      console.log(formik.values);
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string()
        .min(3, "First Name is too short")
        .max(17, "First Name is too long")
        .matches(/^[A-Z a-z]{3,17}$/, 'should enter alphabets only')
        .required("First Name cannot be left blank"),
      lastName: Yup.string()
        .min(3, "Last Name is too short")
        .max(17, "Last Name is too long")
        .matches(/^[A-Z a-z]{3,17}$/, 'should enter alphabets only')
        .required("Last Name is mandatory"),
      address1: Yup.string()
        .required("Address is mandatory"),
      address2: Yup.string(),
      city: Yup.string()
        .min(3, "city is too short")
        .max(17, "city is too long")
        .matches(/^[A-Z a-z]{3,17}$/, 'should enter alphabets only')
        .required("City is mandatory"),
      state: Yup.string()
        .min(3, "state is too short")
        .max(17, "state is too long")
        .matches(/^[A-Z a-z]{3,17}$/, 'should enter alphabets only'),
      zip: Yup.string()
        .min(6, "zip code is too short")
        .max(6, "zip code is too long")
        .matches(/^[0-9]{6}$/, 'should enter numbers only')
        .required("zip code is mandatory"),
      country: Yup.string()
        .min(2, "country is too short")
        .max(17, "country is too long")
        .matches(/^[A-Z a-z]{2,17}$/, 'should enter alphabets only')
        .required("country is mandatory")

    })
  })
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payer's info
      </Typography>
      <form>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              label="First name"
              fullWidth
              autoComplete="given-name"
              variant="outlined"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.firstName && formik.touched.firstName ? <span className='text-danger'>{formik.errors.firstName}</span> : null}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              label="Last name"
              fullWidth
              autoComplete="family-name"
              variant="outlined"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.lastName && formik.touched.lastName ? <span className='text-danger'>{formik.errors.lastName}</span> : null}
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address1"
              label="Address line 1"
              fullWidth
              autoComplete="shipping address-line1"
              variant="outlined"
              value={formik.values.address1}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.address1 && formik.touched.address1 ? <span className='text-danger'>{formik.errors.address1}</span> : null}
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address2"
              label="Address line 2"
              fullWidth
              autoComplete="shipping address-line2"
              variant="outlined"
              value={formik.values.address2}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.address2 && formik.touched.address2 ? <span className='text-danger'>{formik.errors.address2}</span> : null}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              label="City"
              fullWidth
              autoComplete="shipping address-level2"
              variant="outlined"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.city && formik.touched.city ? <span className='text-danger'>{formik.errors.city}</span> : null}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="state"
              label="State/Province/Region"
              fullWidth
              variant="outlined"
              value={formik.values.state}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.state && formik.touched.state ? <span className='text-danger'>{formik.errors.state}</span> : null}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              label="Zip / Postal code"
              fullWidth
              autoComplete="shipping postal-code"
              variant="outlined"
              value={formik.values.zip}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.zip && formik.touched.zip ? <span className='text-danger'>{formik.errors.zip}</span> : null}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="country"
              label="Country"
              fullWidth
              autoComplete="shipping country"
              variant="outlined"
              value={formik.values.country}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.country && formik.touched.country ? <span className='text-danger'>{formik.errors.country}</span> : null}
          </Grid>
          <React.Fragment>
            <Box sx={{ display: 'flex', marginLeft: 'auto' }}>
              <Button
                disabled={!formik.isValid}
                type='button'
                variant="contained"
                onClick={() => {
                  props.goToPaymentInfoHandler()
                  formik.handleSubmit()
                }}
                sx={{ mt: 3, ml: 1, float: 'right' }}
              >
                Next
              </Button>
            </Box>
          </React.Fragment>
        </Grid>
      </form>
    </React.Fragment>
  );
}