import { Button, Container } from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Paper, Typography } from '@mui/material';
import UserContext from '../../context/notes/UserContext';

function AdminLoansToApprove() {
  const [loanPending, setloanPending] = useState([]);
  const { loanInfo, setloanInfo } = useContext(UserContext);

  useEffect(() => {
    axios.get("http://localhost:8765/api/v1/getAll")
      .then(response => {
        setloanInfo(response.data);
        setloanPending(response.data.filter(d => d.loanStatus === 'pending'));
      })
      .catch(e => console.log(e));
  }, []);

  function handleApproval(loanId) {
    setloanPending(loanPending.filter(d => d.loanId !== loanId));
    axios.post(`http://localhost:8765/api/v1/approve/${loanId}`)
      .then(response => {
        alert(`Accepted Loan with ID: ${loanId}`);
      })
      .catch(e => console.log(e));
  }

  function handleRejection(loanId) {
    setloanPending(loanPending.filter(d => d.loanId !== loanId));
    axios.post(`http://localhost:8765/api/v1/reject/${loanId}`)
      .then(response => {
        alert(`Rejected Loan with ID: ${loanId}`);
      })
      .catch(e => console.log(e));
  }

  async function handleViewDocuments(loanId, aadhaar, loanType) {
    try {
      const response = await fetch(`http://localhost:8765/api/v1/loan/${loanType}/docs/getFile/${loanId}`); // Replace with your backend API URL
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${aadhaar}_${loanType}_${loanId}.zip`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Container sx={{ paddingTop: '130px', paddingBottom: '500px' }}>
      <Typography variant='h3' sx={{ textAlign: 'center' }}>Loans to Approve</Typography>

      {loanPending.length === 0 ? (
        <Typography variant='h6' sx={{ textAlign: 'center', paddingTop: '20px' }}>
          No loans to approve
        </Typography>
      ) : (
        loanPending.map(loan =>
          <Paper key={loan.loanId} elevation={3} style={{ padding: '16px', margin: '16px' }}>
            <Typography variant="h6">Loan Application</Typography>
            <Typography>Aadhar Number: {loan.aadhaar}</Typography>
            <Typography>Loan Amount Requested: {loan.totalPrincipal}</Typography>
            <Typography>EMI: {loan.loanEmi}</Typography>
            <Typography>Tenure: {loan.loanTenure}</Typography>
            <Typography>Loan Type: {loan.loanType.charAt(0).toUpperCase() + loan.loanType.slice(1)}</Typography>
            <Button variant="contained" color="primary" style={{ margin: '8px' }} onClick={() => { handleViewDocuments(loan.loanId, loan.aadhaar, loan.loanType) }}>
              View Documents
            </Button>
            <Button variant="contained" color="success" style={{ margin: '8px' }} onClick={() => { handleApproval(loan.loanId) }}>
              Approve
            </Button>
            <Button variant="contained" color="error" style={{ margin: '8px' }} onClick={() => { handleRejection(loan.loanId) }}>
              Reject
            </Button>
          </Paper>
        )
      )}
    </Container>
  );
}

export default AdminLoansToApprove;
