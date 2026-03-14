import { Container, Grid } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import './ManageLoans.css'
import { useNavigate } from 'react-router-dom';
import DisplayLoan from '../DisplayLoan/DisplayLoan';
import LoanStatus from '../LoanStatus/LoanStatus';
import axios from 'axios';
import UserContext from '../../context/notes/UserContext';



function ManageLoans() {
  const [completed, setcompleted] = useState("false")
  const [rejected, setrejected] = useState("false")
  const [pending, setpending] = useState("false")
  const [approved, setapproved] = useState("false")
  const {email} = useContext(UserContext);

  const [loans, setloans] = useState([
    // {
    //   "loanId": '1',
    //   "loanType": "home",
    //   "loanStatus": "approved",
    //   "loanEmi": "11714",
    //   "loanTenure": "120",
    //   "loanTenurePending": "120",
    //   "totalPrincipal": "1000000",
    //   "totalAmountPaid": "0",
    //   "principalLeft": "1000000",
    //   "rateOfInterest": "7.2",
    //   "paidEmiNumber": "0",
    //   "missedEmi": "0",
    //   "emiDate": ""
    // },
    // {
    //   "loanId": '2',
    //   "loanType": "personal",
    //   "loanStatus": "approved",
    //   "loanEmi": "11714",
    //   "loanTenure": "120",
    //   "loanTenurePending": "120",
    //   "totalPrincipal": "1000000",
    //   "totalAmountPaid": "0",
    //   "principalLeft": "1000000",
    //   "rateOfInterest": "7.2",
    //   "paidEmiNumber": "6",
    //   "missedEmi": "0",
    //   "emiDate": ""
    // },
    // {
    //   "loanId": '3',
    //   "loanType": "gold",
    //   "loanStatus": "approved",
    //   "loanEmi": "11714",
    //   "loanTenure": "120",
    //   "loanTenurePending": "120",
    //   "totalPrincipal": "1000000",
    //   "totalAmountPaid": "0",
    //   "principalLeft": "1000000",
    //   "rateOfInterest": "7.2",
    //   "paidEmiNumber": "5",
    //   "missedEmi": "0",
    //   "emiDate": ""
    // },
    // {
    //   "loanId": '4',
    //   "loanType": "car",
    //   "loanStatus": "approved",
    //   "loanEmi": "11714",
    //   "loanTenure": "120",
    //   "loanTenurePending": "120",
    //   "totalPrincipal": "1000000",
    //   "totalAmountPaid": "0",
    //   "principalLeft": "1000000",
    //   "rateOfInterest": "7.2",
    //   "paidEmiNumber": "7",
    //   "missedEmi": "0",
    //   "emiDate": ""
    // },
    // {
    //   "loanId": '5',
    //   "loanType": "home",
    //   "loanStatus": "pending",
    //   "loanEmi": "11714",
    //   "loanTenure": "120",
    //   "loanTenurePending": "120",
    //   "totalPrincipal": "1000000",
    //   "totalAmountPaid": "0",
    //   "principalLeft": "1000000",
    //   "rateOfInterest": "7.2",
    //   "paidEmiNumber": "0",
    //   "missedEmi": "0",
    //   "emiDate": ""
    // },
    // {
    //   "loanId": '6',
    //   "loanType": "home",
    //   "loanStatus": "completed",
    //   "loanEmi": "11714",
    //   "loanTenure": "120",
    //   "loanTenurePending": "120",
    //   "totalPrincipal": "1000000",
    //   "totalAmountPaid": "0",
    //   "principalLeft": "1000000",
    //   "rateOfInterest": "7.2",
    //   "paidEmiNumber": "0",
    //   "missedEmi": "0",
    //   "emiDate": ""
    // },
    // {
    //   "loanId": '7',
    //   "loanType": "home",
    //   "loanStatus": "completed",
    //   "loanEmi": "11714",
    //   "loanTenure": "120",
    //   "loanTenurePending": "120",
    //   "totalPrincipal": "1000000",
    //   "totalAmountPaid": "0",
    //   "principalLeft": "1000000",
    //   "rateOfInterest": "7.2",
    //   "paidEmiNumber": "0",
    //   "missedEmi": "0",
    //   "emiDate": ""
    // },


  ])

  const navigate = useNavigate()

  useEffect(() => {
    const headers={
      'Content-Type': 'application/json',
        'emailid': localStorage.getItem("userEmail")
    }
    const config={
      headers:headers
    }
    axios.get("http://localhost:8765/api/v1/loanInformation", config)
      .then(data => {
        console.log(data.data);
        setloans(data.data);
      })
      .catch(e => console.log(e));
  }, [])

  return (
    <Container>
      <div className='manageLoans'>
        <h1>Manage Your Loans</h1>
        <div>
          <h3>Ongoing Loans</h3>
          <Grid container spacing={2}>

            {loans.map(l => l.loanStatus == "approved" ? <DisplayLoan key={l.loanId} id={l.loanId} lType={l.loanType} lamount={l.totalPrincipal} lTenure={l.loanTenure} lEmi={l.loanEmi}
              lInterest={l.rateOfInterest} lemis={l.paidEmiNumber} lmissed={l.missedEmi} lAmountPaid={l.totalAmountPaid} tleft={l.loanTenurePending} ldate={l.emiDate}/> : null)}

            {loans.map(l => l.loanStatus == 'approved' && approved == 'false' ? setapproved('true') : null)}
            <div className='mt-2 ms-3' style={{ display: approved == "false" ? 'flex' : 'none' }}>There are no ongoing loans as of now</div>

          </Grid>
        </div>

        <br />
        <br />
        <div>
          <h3>Completed Loans</h3>
          <Grid container spacing={2}>

            {loans.map(l => l.loanStatus == "completed" ? <DisplayLoan key={l.loanId} lType={l.loanType} lamount={l.totalPrincipal} lTenure={l.loanTenure} lEmi={l.loanEmi}
              lInterest={l.rateOfInterest} lemis={l.paidEmiNumber} lmissed={l.missedEmi} lAmountPaid={l.totalAmountPaid} status={l.loanStatus} /> : null)}

            {loans.map(l => l.loanStatus == 'completed' && completed == 'false' ? setcompleted('true') : null)}
            <div className='mt-2 ms-3' style={{ display: completed == "false" ? 'flex' : 'none' }}>There are no completed loans as of now</div>

          </Grid>
        </div>

        <br />
        <br />
        <div>
          <h3>Pending Loans</h3>
          <Grid container spacing={2}>

            {loans.map(l => l.loanStatus == "pending" ? <LoanStatus key={l.loanId} lType={l.loanType} lamount={l.totalPrincipal} lTenure={l.loanTenure} lInterest={l.rateOfInterest} /> : null)}

            {loans.map(l => l.loanStatus == 'pending' && pending == 'false' ? setpending('true') : null)}
            <div className='mt-2 ms-3' style={{ display: pending == "false" ? 'flex' : 'none' }}>There are no pending loans as of now</div>

          </Grid>
        </div>
        <br />
        <br />
        <div>
          <h3>Rejected Loans</h3>
          <Grid container spacing={2}>

            {loans.map(l => l.loanStatus == "rejected" ? <LoanStatus key={l.loanId} lStatus={l.loanStatus} lType={l.loanType} lamount={l.totalPrincipal} lTenure={l.loanTenure} lInterest={l.rateOfInterest} /> : null)}

            {loans.map(l => l.loanStatus == 'rejected' && rejected == 'false' ? setrejected('true') : null)}
            <div className='mt-2 ms-3' style={{ display: rejected == "false" ? 'flex' : 'none' }}>There are no rejected loans as of now</div>

          </Grid>
        </div>

      </div>
    </Container>
  )
}

export default ManageLoans