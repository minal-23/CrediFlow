import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { Box, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from "yup";



export default function Review(props) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Loan payment review
      </Typography>
      <Grid container spacing={3}>
        <React.Fragment>
          <Grid item xs={12}>
            <div className='card pt-0'>
              <div className="card-body pt-0">
                <ul className='card-text pt-0'>
                  <p className='mt-3 mb-3'>Principal Amount = </p>
                  <p className='mb-3'>Total Amount Paid= </p>
                  <p className='mb-3'>EMI=</p>
                  <p className='mb-3'>Interest Paid(per month)=</p>
                </ul>
              </div>
            </div>
          </Grid>
          <Box sx={{ display: 'flex', marginLeft: 'auto' }}>
            <Button
              type='submit'
              variant="contained"
              onClick={() => {
                props.goToPaymentInfoHandler()
              }}
              sx={{ mt: 3, ml: 1, float: 'right' }}
            >
              Back
            </Button>
          </Box>
        </React.Fragment>
        <React.Fragment>
          <Box sx={{ display: 'flex', marginLeft: 'auto' }}>
            <Button
              type='button'
              variant="contained"
              onClick={() => {
                props.goToSuccessfulTransferHandler()
              }}
              sx={{ mt: 3, ml: 1, float: 'right' }}
            >
              Next
            </Button>
          </Box>
        </React.Fragment>
      </Grid>

    </React.Fragment>
  );
}