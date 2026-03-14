import React from 'react';

import { Typography, Container, Grid } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import { Link, Outlet} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
  RootContainer,
  Image,
  Text,
  SmallText,
  Terms,
  LowerContainer,
} from './GoldLoanStyle';


function GoldLoan() {
  // const classes = mystyle();
  const navigate = useNavigate();

  return (
    <div>
      <CssBaseline />
      <main>
        <RootContainer maxWidth="xl">
        <Grid container justifyContent="center">
  <Grid item xs={12} sm={12} md={6}>
    <Typography style={{ fontSize: '42px', textAlign: 'center',fontFamily:'Alfa Slab One, cursive' }}>
      Empower Your Financial Goals with a Gold Loan
    </Typography>
    <Typography variant='body2'>
      Know the hidden value of your gold assets. Enjoy low interest rates, minimal documentation, and fast disbursal, making it the ideal solution for your immediate financial requirements. Here at Natwest, we provide competitive interest rates, flexible repayment options, and quick approval. And a hassle-free borrowing experience tailored to your financial needs.
    </Typography>
  </Grid>
</Grid>

        </RootContainer>
        <Container maxWidth="lg">
        <SmallText>
          <Typography style={{fontSize:'30px',fontFamily:'Alfa Slab One, cursive'}}gutterbottom>Gold Loan Details</Typography>
        <TableContainer component={Paper} gutterbottom>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Gold Loan Amount</TableCell>
            <TableCell align="right">Starting at INR 25,000</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Gold Loan Tenure</TableCell>
            <TableCell align="right">From 3 months up to 24 months</TableCell>
            </TableRow>
            <TableRow>
            <TableCell>Interest Rates</TableCell>
            <TableCell align="right">Starting from 9.50% per annum</TableCell>
            </TableRow>
            <TableRow>
            <TableCell>Gold Loan Processing Fee</TableCell>
            <TableCell align="right">1.50% of the Principal Loan Amount,Pay no hidden charges and experience a completely transparent process</TableCell>
            </TableRow>
            <TableRow>
            <TableCell>Valuation of the asset ( Borrowing Amount )</TableCell>
            <TableCell align="right">Associated with each gram of pledged gold*</TableCell>
            </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
    </SmallText>
              <Terms variant='p' style={{ padding: '0', margin: '0' }} gutterbottom>*Rates per gram for each gram of gold varies based on different factors such
                as current market value,purity of gold and even international gold prices.<br/>
                What is Gold Loan per gram?<br/>
                For instance if you own 20 grams of 22 karat gold, and the per gram rate is INR 
                4,500,the combined market value of the gold possessions equals INR 90,000
                Thus, you can potentially secure a loan up to INR 67,500(75% of the total market value)</Terms>
                <br/>
                </Container>
<Container maxWidth='lg'>
<SmallText maxWidth='lg' >
        <Typography style={{fontSize:'30px',fontFamily:'Alfa Slab One, cursive'}}>Documents required to apply online:</Typography>
      <List sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary="Proof of Identity"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
                alignContent='center'
              >
                Aadhar  Card and PAN Card
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider component="li" />
      <ListItem alignItems="flex-start">
        <ListItemText
          primary="Proof of Address"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Passport or Utility Bills(Electrictity,Water or Gas)
              </Typography><br/>
              {" — Not older than 3 months"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider component="li" />
      <ListItem alignItems="flex-start">
        <ListItemText
          primary="Photograph"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Recent Passport size Photograph
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemText
          primary="Gold Assay Certificate"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Gold Purity certificate or bill or receipt of purchase of the gold item
              </Typography>
              {' — 18K or 22K or 24K'}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider component="li" />
    </List>
        </SmallText>
        </Container>
        <LowerContainer maxWidth="xl" >
        <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6}>
         <Typography style={{fontSize:'32px'}}>
                  Sounds good so far ?<br/>
                  Ready to Apply?
                  <br/>
                 <Button  style={{color:'#6824a3',backgroundColor:'white'}} onClick={()=>navigate('form')}>Let's Start</Button>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
        <Typography style={{fontSize:'32px'}}>
                  Want to know more?<br/>
                  <Button  style={{color:'#6824a3',backgroundColor:'white'}}>Talk to Us</Button>
          </Typography>
        </Grid>
      </Grid>
        </LowerContainer>
      </main>
    </div>
  );
}

export default GoldLoan;
