import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Box, Button } from '@mui/material';
import { useFormik, useFormikContext } from 'formik';
import * as Yup from "yup";
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../../context/notes/UserContext';

export default function PaymentForm(props) {
  const [emi, setemi] = useState(1200)
  const [completeLoan, setcompleteLoan] = useState(120000)
  const { email } = React.useContext(UserContext);

  const [cLocation, setcLocation] = useState(window.location.href);
  const { id } = useParams()

  const formik = useFormik({
    initialValues: {
      bankAccount: "",
      ifscCode: "",
      cBankAccount: "",
      pin: "",
      amount: ""
    },
    onSubmit: values => {
      console.log(formik.values);
      fetch(`http://localhost:8765/api/v1/loanInformation/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'emailid': localStorage.getItem("userEmail")
        },
        body: (formik.values.amount.valueOf())
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
        })

    },
    validationSchema: Yup.object().shape({
      bankAccount: Yup.string()
        .min(5, "Bank Account is too short")
        .max(17, "Bank Account is too long")
        .matches(/^[A-Za-z0-9]{5,17}$/, 'should enter alphabets or numbers only')
        .required("Bank Account cannot be left blank"),
      ifscCode: Yup.string()
        .min(11, "IFSC code should have 11 digits")
        .max(11, "IFSC code should have 11 digits")
        .matches(/^[A-Z0-9]{11}$/, 'should enter alphabets or numbres only')
        .required("IFSC code is mandatory"),
      cBankAccount: Yup.string()
        .required("Confirm Bank Account is mandatory")
        .oneOf([Yup.ref('bankAccount')], 'Account Number must match'),
      pin: Yup.string()
        .min(4, "Pin is too short")
        .max(12, "Pin is too long")
        .required("Pin is mandatory"),
      amount: Yup.number()
        .positive("amount should be positive")
        .min(emi, `amount should atleast be greater than or eqaul to ${emi}`)
        .max(completeLoan, `amount should be less than the ${completeLoan} (loan amount left to be paid)`)
        .required("Amount is required"),

    })
  })

  React.useEffect(() => {
    const headers = {
      'Content-Type': 'application/json',
      'emailid': localStorage.getItem("userEmail")
    }
    const config = {
      headers: headers
    }
    axios.get(`http://localhost:8765/api/v1/loanInformation/${id}`, config)
      .then(data => {
        console.log(data.data);
        setemi(data.data.loanEmi);
        formik.setFieldValue("amount", data.data.loanEmi)
        let pLeft = parseFloat(data.data.principalLeft)
        let tLeft = parseFloat(data.data.loanTenurePending)
        let emi = parseFloat(data.data.loanEmi)
        let maxValue = parseFloat(pLeft + emi - ((pLeft / tLeft))).toFixed(6);
        console.log(pLeft);
        console.log(tLeft);
        console.log(emi);
        console.log(maxValue);
        setcompleteLoan(maxValue)
      })
  }, [])


  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment details
      </Typography>
      <form>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="bankAccount"
              label="Bank Account"
              fullWidth
              autoComplete="cc-BankAccount"
              variant="outlined"
              value={formik.values.bankAccount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.bankAccount && formik.touched.bankAccount ? <span className='text-danger'>{formik.errors.bankAccount}</span> : null}
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="ifscCode"
              label="IFSC code"
              fullWidth
              autoComplete="cc-IFSC"
              variant="outlined"
              value={formik.values.ifscCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.ifscCode && formik.touched.ifscCode ? <span className='text-danger'>{formik.errors.ifscCode}</span> : null}
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cBankAccount"
              label="Confirm Bank Account"
              fullWidth
              autoComplete="cc-confirmAccount"
              variant="outlined"
              value={formik.values.cBankAccount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.cBankAccount && formik.touched.cBankAccount ? <span className='text-danger'>{formik.errors.cBankAccount}</span> : null}
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="pin"
              label="PIN"
              fullWidth
              autoComplete="cc-pin"
              variant="outlined"
              value={formik.values.pin}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.pin && formik.touched.pin ? <span className='text-danger'>{formik.errors.pin}</span> : null}
          </Grid>

          <Grid item xs={12} md={6}>
            {cLocation.includes("prepay") ?
              <div>
                <TextField
                  required
                  id="amount"
                  label="Amount"
                  fullWidth
                  autoComplete="cc-amount"
                  variant="outlined"
                  value={formik.values.amount}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.amount && formik.touched.amount ? <span className='text-danger'>{formik.errors.amount}</span> : null}
              </div>
              : null}

          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', marginLeft: 'auto' }}>
          <Button
            type='submit'
            variant="contained"
            onClick={() => {
              props.goToPayeeInfoHandler()
            }}
            sx={{ mt: 3, ml: 1, float: 'right' }}
          >
            Back
          </Button>
          <Button
            disabled={!formik.isValid}
            type='button'
            variant="contained"
            onClick={() => {
              props.goToReviewFormHandler()
              formik.handleSubmit()
            }}
            sx={{ mt: 3, ml: 1, float: 'right' }}
          >
            Next
          </Button>
        </Box>

      </form>
    </React.Fragment>
  );
}