import React,{useState} from 'react';
import pic from './pic.avif';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { Box, TableRow } from '@mui/material';
import {TableCell,TableBody,Table, TableContainer,TableHead} from '@mui/material';
import Slider from '@mui/material/Slider';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useNavigate } from 'react-router-dom';
import './CarLoan.css';
import { CenterFocusStrong, NoEncryption } from '@mui/icons-material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';



function LoanInfoContent(){
    return(
        <div>
          <div style={{ flex: 1, backgroundColor: '#5a287d', color: 'white', padding: '2rem' }}>
            <Typography variant="h4" style={{ marginBottom: '20px' }}>Car Loan Details</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ borderBottom: '1px solid #000', borderRight: '1px solid #000' }}>Details</TableCell>
                    <TableCell style={{ borderBottom: '1px solid #000' }}>Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell style={{ borderRight: '1px solid #000' }}>Maximum Loan Amount</TableCell>
                    <TableCell>Rs. 35,00,000 (Thirty-Five Lakhs Rupees)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ borderRight: '1px solid #000' }}>Maximum Loan Tenure</TableCell>
                    <TableCell>7 years</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ borderRight: '1px solid #000' }}>Interest Rates</TableCell>
                    <TableCell>Starting from 6.0% per annum</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ borderRight: '1px solid #000' }}>Processing fees</TableCell>
                    <TableCell>Rs. 2,000 - Rs. 5,000 (varies based on the loan amount)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ borderRight: '1px solid #000' }}>Loan to Value (LTV) Ratio</TableCell>
                    <TableCell>Up to 80% of the Car Value</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
    )
}

function EligibilityContent(){
    return(
        <div>
            <Typography variant="h5" style={{ color: '#6824a3' }}>
                Documents required for applying
            </Typography>
            <ul>
                <li>Individuals who have an account with Natwest and have maintained it for at least 6 months.</li>
                <li>Individuals who are a minimum of 21 years of age at the time of applying for the loan and no older than 60 at the end of the loan tenure.</li>
                <li>Individuals who earn a minimum annual income of Rs. 3,00,000.</li>
            </ul>  
        </div>
    )
}

function DocContent(){
    return(
        <div>
            <Typography variant="h5" style={{ color: '#6824a3' }}>
                Documents required for applying
            </Typography>
                          <ul>
                            <li>Proof of Identity (Any one): Aadhar/PAN/Passport/Voter ID/Driving License</li>
                            <li>Permanent Driving License</li>
                            <li>Bank statement of the previous 6 months</li>
                            <li>Income proof<ul>
                                    <li>For salaried individuals, latest salary slip and Form 16</li>
                                    <li>In case of Sole Proprietorship,Latest Income Tax Returns (ITR)</li>
                                    <li>For Partnership Firms/Private Limited Companies/Public Limited Companies, submit any below documents</li>
                                        <ul>
                                            <li>Audited Balance Sheet</li>
                                            <li>Profit and Loss Account of the previous 2 years</li>
                                            <li>Company ITR for the previous 2 years</li>
                                        </ul>
                                </ul>
                            </li>
                        </ul>

          
        </div>
    )
}

function TabbedInfo() {
  const [value, setValue] = React.useState(2);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabContents = [
    <LoanInfoContent/>,
    <EligibilityContent/>,
    <DocContent/>,
  ];

  return (
    <div style={{alignItems:'center'}}>
        <Container maxWidth="lg"style={{
        backgroundColor: '#E8DAF1',
        minHeight: '400px', // Set a fixed height for the container
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '30px',
        paddingBottom: '30px'
        
      }}>
        <Box textAlign="center"> {/* Center-align the heading */}
        <Typography variant="h4">All you need to know</Typography>
      </Box>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="LOAN INFORMATION" />
        <Tab label="ELIGIBILITY" />
        <Tab label="DOCUMENTATION" />
      </Tabs>

      {/* Display content based on the selected tab */}
      <Typography variant="body1">{tabContents[value]}</Typography>
    </Container>
      
    </div>
  );
}

function CarLoan() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
      };
  return (
    <div>
      <div className="row topsection" style={{ backgroundColor: '#5a287d', textAlign:'center'}}>
          <Typography variant="h4" style={{ color: 'white' }}>
            Natwest Car Loans: Your Path to Driving Your Dream
          </Typography>
          <Typography variant="body1" style={{ color: 'white' }}>
            We understand that buying a car is a milestone in your life, and we are here to help make it happen. Our car loans offer competitive interest rates and flexible repayment options, ensuring that you can drive your dream car without any financial stress.
          </Typography>
        
        
      </div>
      <div className="row" style={{paddingTop: '30px'}}>
      <div className="col-md-5 offset-md-2" style={{padding:'10px'}}>
          <img className="img-fluid" src={pic} alt="Car loan related" />
        </div> 
      <div className='col-md-4' style={{paddingTop:'30px'}}>
      <Typography variant="h5" style={{ color: '#6824a3' }}>
                Features of our car loans
            </Typography>
            <List>
                <ListItem>
                <ListItemAvatar>
                    <Avatar style={{ backgroundColor: '#401664' }}>
                    <DriveEtaIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Low-interest rates" />
                </ListItem>
                <ListItem>
                <ListItemAvatar>
                    <Avatar style={{ backgroundColor: '#401664' }}>
                    <DriveEtaIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Flexible loan terms" />
                </ListItem>
                <ListItem>
                <ListItemAvatar>
                    <Avatar style={{ backgroundColor: '#401664' }}>
                    <DriveEtaIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Quick approval process" />
                </ListItem>
                <ListItem>
                <ListItemAvatar>
                    <Avatar style={{ backgroundColor: '#401664' }}>
                    <DriveEtaIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="No prepayment penalties" />
                </ListItem>
                <ListItem>
                <ListItemAvatar>
                    <Avatar style={{ backgroundColor: '#401664' }}>
                    <DriveEtaIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Easy online application" />
                </ListItem>
            </List>
      </div>
      </div>
      
      
      <Container maxWidth="lg">
      <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '80vh' }}>
        <Grid item xs={12} sm={10}>
          <TabbedInfo />
        </Grid>
      </Grid>
    </Container>
    <div>
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Button variant="contained" size="large" sx={{
          marginRight: 1, backgroundColor: "#5a287d", '&:hover': {
            backgroundColor: "#8e44ad",
          },
        }} onClick={()=>navigate('form')}>
          Apply Now
        </Button>
      </div>
    </div>
    </div>
  );
}

export default CarLoan;
