// import { Formik, useFormik } from 'formik'
// import React from 'react'
// import * as yup from 'yup'
// import './PrepayLoan.css'

// export default function PrepayLoanForm() {
//     const formik = useFormik({
//         initialValues: {
//             payeeName: "",
//             bankAccount: "",
//             confirmBankAccount: "",
//             IFSCcode: "",
//             pin: "",
//             amount: ""
//         },

//         validationSchema: yup.object().shape({
//             payeeName: yup.string()
//                 .min(3, 'Name must be at least 3 characters')
//                 .max(30, 'Name is too long')
//                 .matches(/^[A-Z a-z]{3,30}$/, 'should enter alphabets only')
//                 .required('Name is mandatory'),
//             bankAccount: yup.string()
//                 .min(5, "Bank Account is too short")
//                 .max(17, "Bank Account is too long")
//                 .matches(/^[A-Za-z0-9]{5,17}$/, 'should enter alphabets or numbres only')
//                 .required("Bank Account cannot be left blank"),

//             confirmBankAccount: yup.string()
//                 .required("Confirm Bank Account is mandatory")
//                 .oneOf([yup.ref('bankAccount')], 'Account Number must match'),

//             IFSCcode: yup.string()
//                 .min(11, "IFSC code should have 11 digits")
//                 .max(11, "IFSC code should have 11 digits")
//                 .matches(/^[A-Z0-9]{11}$/, 'should enter alphabets or numbres only')
//                 .required("IFSC code is mandatory"),

//             pin: yup.string()
//                 .min(4, "Pin is too short")
//                 .max(12, "Pin is too long")
//                 .required("Pin is mandatory"),

//             amount: yup.number()
//                 .positive("Amount can be positive only")
//                 .required("Amount is mandatory")
//         })

//     })
//     return (
//         <div className="container prePay">
//             <div className="row">
//                 <div className="col-md-4 offset-md-4">
//                     <div className="bg-primary text-light text-center rounded">
//                         <h2>Pre-Pay Your Loan</h2>
//                     </div>
//                     <form onSubmit={formik.handleSubmit}>

//                         <div className="mb-3 mt-3">
//                             <input type="text" name='payeeName' className='form-control' placeholder='Payee Name' value={formik.values.payeeName}
//                                 onChange={formik.handleChange} onBlur={formik.handleBlur} />
//                             {formik.errors.payeeName && formik.touched.payeeName ? <span className='text-danger'>{formik.errors.payeeName}</span> : null}
//                         </div>
//                         <div className="mb-3 mt-3">
//                             <input type="text" name='bankAccount' className='form-control' placeholder='Bank Account Number' value={formik.values.bankAccount}
//                                 onChange={formik.handleChange} onBlur={formik.handleBlur} />
//                             {formik.errors.bankAccount && formik.touched.bankAccount ? <span className='text-danger'>{formik.errors.bankAccount}</span> : null}
//                         </div>
//                         <div className="mb-3 mt-3">
//                             <input type="text" name='confirmBankAccount' className='form-control' placeholder='Confirm Bank Account Number' value={formik.values.confirmBankAccount}
//                                 onChange={formik.handleChange} onBlur={formik.handleBlur} />
//                             {formik.errors.confirmBankAccount && formik.touched.confirmBankAccount ? <span className='text-danger'>{formik.errors.confirmBankAccount}</span> : null}
//                         </div>
//                         <div className="mb-3">
//                             <input type="text" name='IFSCcode' className='form-control' placeholder='Enter IFSC code' value={formik.values.IFSCcode}
//                                 onChange={formik.handleChange} onBlur={formik.handleBlur} />
//                             {formik.errors.IFSCcode && formik.touched.IFSCcode ? <span className='text-danger'>{formik.errors.IFSCcode}</span> : null}

//                         </div>
//                         <div className="mb-3">
//                             <input type="text" name='pin' className='form-control' placeholder='Enter PIN' value={formik.values.pin}
//                                 onChange={formik.handleChange} onBlur={formik.handleBlur} />
//                             {formik.errors.pin && formik.touched.pin ? <span className='text-danger'>{formik.errors.pin}</span> : null}

//                         </div>
//                         <div className="mb-3">
//                             <input type="number" name='amount' className='form-control' placeholder='Amount to Pre-Pay' value={formik.values.amount}
//                                 onChange={formik.handleChange} onBlur={formik.handleBlur} />
//                             {formik.errors.amount && formik.touched.amount ? <span className='text-danger'>{formik.errors.amount}</span> : null}
//                         </div>
//                         <button className='btn btn-primary col-12' type='submit'>Pay Now</button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     )
// }

import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import BankinfoForm from '../BankinfoForm/BankinfoForm';
import PaymentForm from '../PaymentForm/PaymentForm';
import Review from '../ReviewForm/Review';
import './PrepayLoan.css'
import { useState } from 'react';




export default function Checkout() {
  const [activeStep, setactiveStep] = React.useState(0);
  const [noDetails, setnoDetails] = useState(false)


  const goToPaymentInfo = () => {
    setactiveStep(1);
  }
  const goToPayeeInfo = () => {
    setactiveStep(0);
  }
  const goToReviewForm = () => {
    setactiveStep(2);
  }
  const goToSuccessfulTransfer = () => {
    setactiveStep(3)
  }
  

  return (
    <React.Fragment>
      <CssBaseline />

      <Container className='payemi' component="main" maxWidth="sm" sx={{ mb: 4, paddingBottom:'15vh', paddingTop:'20vh' }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep}>
            <Step>
              <StepLabel>Payer Details</StepLabel>
            </Step>
            <Step>
              <StepLabel>Payment Details</StepLabel>
            </Step>
            {/* <Step>
              <StepLabel>Review Payment</StepLabel>
            </Step> */}
          </Stepper>
          <br></br>
          {activeStep == 0 ? <BankinfoForm goToPaymentInfoHandler={() => goToPaymentInfo()} /> : null}
          {activeStep == 1 ? <PaymentForm goToPayeeInfoHandler={() => goToPayeeInfo()} goToReviewFormHandler={() => goToReviewForm()} /> : null}
          {/* {activeStep === 2 ? <Review goToPaymentInfoHandler={() => goToPaymentInfo()} goToSuccessfulTransferHandler={() => goToSuccessfulTransfer()} /> : null} */}
          {activeStep === 2 ? <Typography variant="subtitle1">
            Your payment has been Successfully completed.
            <Link to="/home">
              <br/>
              <Button
                variant="outlined"
                sx={{ mt: 3, ml: 1 }}

              >Go to Home</Button>
            </Link>

          </Typography> : null}
        </Paper>
      </Container>
    </React.Fragment>
  );
}
