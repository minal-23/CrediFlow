import React, {useState} from 'react';
import { Container, Grid, Typography, Paper, Button, List, ListItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,  Dialog, DialogActions, DialogContent, DialogTitle, Slider, Box, TextField } from '@mui/material';
import Capture from './Capture.PNG';
import { useNavigate } from 'react-router-dom';

const HomeLoan = () => {
  const navigate = useNavigate();
  const [sliderDetails, setsliderDetails] = useState(
    [
      {
        sliderTitle: "Loan Amount",
        textFieldMin: 0,
        textFieldMax: 500000,
        textFieldStep: 10000,
        sliderMin: 0,
        sliderMax: 500000,
        sliderStep: 50000,
        inputValue: 0,
        sliderValue: 0

      },
      {
        sliderTitle: "Monthly EMI",
        textFieldMin: 0,
        textFieldMax: 500000,
        textFieldStep: 10000,
        sliderMin: 0,
        sliderMax: 500000,
        sliderStep: 50000,
        inputValue: 0,
        sliderValue: 0

      },
      {
        sliderTitle: "Rate of Interest",
        textFieldMin: 10,
        textFieldMax: 40,
        textFieldStep: 1,
        sliderMin: 10,
        sliderMax: 40,
        sliderStep: 0.5,
        inputValue: 10,
        sliderValue: 10
      },
      {
        sliderTitle: "Tenure",
        textFieldMin: 12,
        textFieldMax: 60,
        textFieldStep: 1,
        sliderMin: 12,
        sliderMax: 60,
        sliderStep: 1,
        inputValue: 12,
        sliderValue: 12
      }
    ]

  )
  const [eligibleAmount, seteligibleAmount] = useState(0);
  const handleInputChanges = (event, index) => {
    if (event.target.value > sliderDetails[index].textFieldMax) {
      return;
    }
    const newValue = event.target.value === '' ? '' : Number(event.target.value);
    const current = [...sliderDetails];
    current[index].inputValue = newValue;
    current[index].sliderValue = newValue;
    setsliderDetails(current);
    formula();
    }

  const handleSliderChanges = (event, newValue, index) => {
    console.log(index);
    const current = [...sliderDetails];
    current[index].inputValue = newValue;
    current[index].sliderValue = newValue;
    setsliderDetails(current);
    formula();
  }

  const formula = () => {
    //dummy formula for now
    seteligibleAmount(1 * sliderDetails[3].inputValue + 2 * sliderDetails[2].inputValue + 3 * sliderDetails[1].inputValue + 4 * sliderDetails[0].inputValue);
  }

  return (
    <div style={{ marginTop: '70px', paddingTop:'20px', position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div id="first" style={{ flex: 1, backgroundColor: '#5a287d', color: 'white', fontFamily:'sans-serif' }}>
        <div style={{ display: 'flex'}}>
          <div style={{ flex: 1 }}>
            <Typography variant="h3" style={{marginTop:'20px', marginLeft:'20px'}}>Home Loans With NatWest</Typography>
            <Typography variant="h5" style={{marginTop:'20px', marginLeft:'20px'}}>Why Choose Our Home Loans?</Typography>
            <Typography variant="h6" style={{marginTop:'20px', marginLeft:'20px'}}>
              At NatWest, we understand that purchasing a home is not just about acquiring a property, it's about turning your dreams into reality. We take pride in being more than just a bank. We are your trusted partner in the journey towards homeownership.
            </Typography>
          </div>
          <div style={{ flex: 1, paddingLeft:'200px' }}>
            <img src={Capture} alt="Home" className="img-fluid" />
          </div>
        </div>
      </div>
      <div style={{ flex: 1, backgroundColor: '#f8f9fa89', padding: '2rem', color: '#000' }}>
        <Typography variant="h4">Features</Typography>
        <List>
          <ListItem>Home Loan products to suit every customer's need</ListItem>
          <ListItem>Low Interest Rates</ListItem>
          <ListItem>Low Processing Fee</ListItem>
          <ListItem>No Pre Payment Penalty</ListItem>
          <ListItem>No Hidden Charges</ListItem>
        </List>
      </div>
      <div style={{ flex: 1, backgroundColor: '#5a287d', color: 'white', padding: '2rem' }}>
        <Typography variant="h4" style={{marginBottom:'20px'}}>Home Loan Details</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell  style={{ borderBottom: '1px solid #000', borderRight: '1px solid #000' }}>Details</TableCell>
                <TableCell  style={{ borderBottom: '1px solid #000' }}>Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell style={{borderRight: '1px solid #000'}}>Maximum Loan Amount</TableCell>
                <TableCell>Rs. 1,00,00,000 (One Crore Rupees)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{borderRight: '1px solid #000'}}>Maximum Loan Tenure</TableCell>
                <TableCell>30 years</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{borderRight: '1px solid #000'}}>Interest Rates</TableCell>
                <TableCell>Starting from 7.5% per annum</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{borderRight: '1px solid #000'}}>Processing fees</TableCell>
                <TableCell>Rs. 5,000 - Rs. 10,000 (varies based on the loan amount)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{borderRight: '1px solid #000'}}>Loan to Value (LTV) Ratio</TableCell>
                <TableCell>Upto 80% of the Property Value</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div style={{ flex: 1, backgroundColor: '#f8f9fa89', padding: '2rem', color: '#000' }}>
        <Typography variant="h4">Eligibility Criteria</Typography>
        <List>
          <ListItem>Resident type - Indian</ListItem>
          <ListItem>Minimum Age - 18 years</ListItem>
          <ListItem>Maximum Age - 70 years</ListItem>
        </List>
      </div>
      <div style={{ flex: 1, backgroundColor: '#5a287d', color: 'white', padding: '2rem' }}>
        <Typography variant="h4">Documents Required</Typography>
        <List>
          <ListItem>Proof of Identity (Any one): PAN/ Passport/ Driver’s License/ Voter ID card</ListItem>
          <ListItem>Proof of Residence/ Address (Any one): Recent copy of Telephone Bill/ Electricity Bill/Water Bill/ Piped Gas Bill or copy of Passport/ Driving License/ Aadhar Card</ListItem>
          <ListItem>Permission for construction (where applicable)</ListItem>
          <ListItem>Occupancy Certificate (in case of ready to move property)</ListItem>
          <ListItem>Approved Plan copy (Xerox Blueprint) & Registered Development Agreement of the builder, Conveyance Deed (For New Property)</ListItem>
          <ListItem>Payment Receipts or bank A/C statement showing all the payments made to Builder/Seller</ListItem>
          <ListItem>Last 6 months Bank Account Statements for all Bank Accounts held by the applicant/s</ListItem>
          <ListItem>Form - 16</ListItem>
        </List>
      </div>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Button variant="contained" size="large" sx={{
          marginRight: 1, backgroundColor: "#5a287d", '&:hover': {
            backgroundColor: "#8e44ad",
          },
        }} onClick={()=>navigate('upload')}>
          Apply Now
        </Button>
      </div>
</div>
);
};

export default HomeLoan;
