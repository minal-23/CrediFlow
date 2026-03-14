import React, { useContext } from 'react'
import UserContext from '../../context/notes/UserContext'

import { Typography,Container, Paper,Grid,Box } from '@mui/material';

function AdminAllLoans() {

    const {loanInfo, setloanInfo} = useContext(UserContext);
    console.log(loanInfo);

  return (
    <Container sx={{ paddingTop: '170px' }}>
      <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '20px' }}>
        Details of All Loans
      </Typography>
      <Grid container spacing={3}>
        {loanInfo.map((loan) => (
          <Grid item xs={12} sm={6} md={4} key={loan.loanId}>
            <Paper elevation={3} sx={{ padding: '20px', textAlign: 'left' }}>
              <Typography variant="h6" sx={{ marginBottom: '15px' }}>
                {loan.loanType.charAt(0).toUpperCase() + loan.loanType.slice(1)} Loan
              </Typography>
              <Box sx={{ marginBottom: '15px' }}>
                <Typography>
                  <strong>Email ID:</strong> {loan.emailid}
                </Typography>
                <Typography>
                  <strong>Aadhar Number:</strong> {loan.aadhaar}
                </Typography>
                <Typography>
                  <strong>Loan Status:</strong> {loan.loanStatus}
                </Typography>
              </Box>
              <Box sx={{ marginBottom: '15px' }}>
                <Typography>
                  <strong>Principal Amount Requested:</strong> {loan.totalPrincipal}
                </Typography>
                <Typography>
                  <strong>EMI:</strong> {loan.loanEmi}
                </Typography>
                <Typography>
                  <strong>Rate of Interest:</strong> {loan.rateOfInterest}%
                </Typography>
              </Box>
              <Box sx={{ marginBottom: '15px' }}>
                <Typography>
                  <strong>Tenure:</strong> {loan.loanTenure} months
                </Typography>
                <Typography>
                  <strong>Next EMI Date:</strong> {loan.emiDate}
                </Typography>
              </Box>
              <Box>
                <Typography>
                  <strong>Payment Information:</strong>
                </Typography>
                <Typography>
                  <strong>Missed EMIs:</strong> {loan.missedEmi}
                </Typography>
                <Typography>
                  <strong>Number of EMIs Paid:</strong> {loan.paidEmiNumber}
                </Typography>
                <Typography>
                  <strong>Principal Left to Pay:</strong> {loan.principalLeft}
                </Typography>
                <Typography>
                  <strong>Principal Amount Paid:</strong> {loan.totalAmountPaid}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default AdminAllLoans