import React, { useState } from 'react'
import {
    Container, Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper,
    Button, Dialog, DialogActions, DialogContent, DialogTitle, Slider, Box, TextField
} from '@mui/material';
import { Link, Outlet, useNavigate } from 'react-router-dom';


function PersonalLoan() {

    // const [sliderValue, setSliderValue] = useState(0);
    // const [inputValue, setInputValue] = useState(0);

    // const handleSliderChange = (event, newValue) => {
    //     setSliderValue(newValue);
    //     setInputValue(newValue);
    // };

    // const handleInputChange = (event) => {
    //     const newValue = event.target.value === '' ? '' : Number(event.target.value);
    //     setSliderValue(newValue);
    //     setInputValue(newValue);
    // };

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const loanDetails = [
        {
            label: 'Max Loan Amount',
            value: 'Rs. 10 Lakhs',
        },
        {
            label: 'Max Loan Tenure',
            value: 'Up to 60 months',
        },
        {
            label: 'Interest Rate',
            value: 'Starting from 10.49% p.a.',
        },
        {
            label: 'Processing Fees',
            value: 'Up to 2% of loan amount + GST',
        }
    ];

    // const sliderDetails = [
    //     {
    //         sliderTitle: "Loan Amount",
    //         textFieldMin: 0,
    //         textFieldMax: 500000,
    //         textFieldStep: 10000,
    //         sliderMin: 0,
    //         sliderMax: 500000,
    //         sliderStep: 50000

    //     },
    //     {
    //         sliderTitle: "Monthly EMI",
    //         textFieldMin: 0,
    //         textFieldMax: 500000,
    //         textFieldStep: 10000,
    //         sliderMin: 0,
    //         sliderMax: 500000,
    //         sliderStep: 50000

    //     },
    //     {
    //         sliderTitle: "Rate of Interest",
    //         textFieldMin: 10,
    //         textFieldMax: 40,
    //         textFieldStep: 1,
    //         sliderMin: 10,
    //         sliderMax: 40,
    //         sliderStep: 0.5

    //     },
    //     {
    //         sliderTitle: "Tenure",
    //         textFieldMin: 12,
    //         textFieldMax: 60,
    //         textFieldStep: 1,
    //         sliderMin: 12,
    //         sliderMax: 60,
    //         sliderStep: 1

    //     }
    // ]

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

    // const [sliderStates, setsliderStates] = useState(
    //     sliderDetails.map(obj => ({
    //         inputValue: obj.textFieldMin,
    //         sliderValue: obj.sliderMin
    //     })
    //     ))

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
        // let cemi = (amount * interestCal * Math.pow((1 + interestCal), time)) / (Math.pow((1 + interestCal), time) - 1);
    }


    return (
        <div style={{ paddingTop: 40 }}>
            <div style={{ backgroundColor: '#5a287d' }}>
                <Container maxWidth="lg" sx={{ color: 'white', padding: '50px', borderRadius: '50px' }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Personal Loan
                    </Typography>
                    <Typography variant="body1" align="center" paragraph sx={{ paddingBottom: '50px' }}>
                        A Personal Loan can help you meet your urgent needs as well achieve your dreams. Apply for NatWest Personal Loans and fulfil all your requirements with ease. Whether you need money for a foreign trip, a sudden medical emergency or unexpected repairs for your house, NatWest Personal Loan is the solution! Enjoy benefits such as fast processing, minimal documentation, competitive interest rates and flexible repayment options.
                    </Typography>
                    <Typography variant="h6" align="center">
                        Personal Loan Details
                    </Typography>
                    <TableContainer component={Paper} sx={{ marginBottom: '50px' }}>
                        <Table>
                            <TableBody>
                                {loanDetails.map((detail, index) => (
                                    <TableRow key={index}>
                                        <TableCell sx={{ fontWeight: 'bold' }}>{detail.label}</TableCell>
                                        <TableCell>{detail.value}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </div>
            <Container sx={{paddingTop: 5}}>
                <Typography variant="h6" align="left" gutterBottom>
                    Documents to Apply for a Personal Loan
                </Typography>
                <Typography variant="body1" align="left" paragraph>
                    When applying for a personal loan, you will need to submit the following documents:
                </Typography>
                <ul>
                    <li>PAN Card</li>
                    <li>Identity proof (Aadhaar Card, Driving licence, Passport, Voter ID, etc.)</li>
                    <li>Signature Proof (Passport, PAN card, etc.)</li>
                    <li>Address proof (Passport copy, Aadhaar card, driving licence, utility bill – gas or electricity bill, Voter ID, ration card, rent agreement, etc.)</li>
                    <li>Bank statements of the past 6 months</li>
                    <li>Salary slips for the last three months</li>
                    <li>Income tax returns OR form 16</li>
                </ul>
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    {/* <Button variant="contained" size="large" sx={{
                        marginRight: 1, backgroundColor: "#5a287d", '&:hover': {
                            backgroundColor: "#8e44ad",
                        },
                    }} onClick={handleClickOpen}>
                        Check Eligibility
                    </Button> */}
                    <Button variant="contained" size="large" sx={{
                        marginRight: 1, backgroundColor: "#5a287d", '&:hover': {
                            backgroundColor: "#8e44ad",
                        },
                    }} onClick={()=>{navigate('upload')}}>
                        Apply Now
                    </Button>
                </div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    maxWidth="lg"
                    fullWidth
                    sx={{
                        '@media (min-width: 1280px)': {
                            '& .MuiDialog-paper': {
                                width: '900px',
                            },
                        },
                    }}
                >
                    <DialogTitle>Check Personal Loan Eligibility</DialogTitle>
                    <DialogContent>
                        {sliderDetails.map((obj, index) => (<Box key={index} display="flex" flexDirection="column">
                            <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" flexWrap="wrap">
                                <Typography variant="h7">{obj.sliderTitle}</Typography>
                                <TextField
                                    type="number"
                                    value={sliderDetails[index].inputValue}
                                    onChange={(event) => { handleInputChanges(event, index) }}
                                    inputProps={{ min: obj.textFieldMin, max: obj.textFieldMax, step: obj.textFieldStep }}
                                    sx={{ width: '190px' }}
                                />
                            </Box>
                            <Box display="flex" flexDirection="row" alignItems="center">
                                <Typography variant="subtitle1" sx={{ padding: 2 }}>{obj.sliderMin}</Typography>
                                <Slider
                                    value={sliderDetails[index].sliderValue}
                                    min={obj.sliderMin}
                                    max={obj.sliderMax}
                                    step={obj.sliderStep}
                                    sx={{ color: 'purple' }}
                                    onChange={(e, newValue) => { handleSliderChanges(e, newValue, index) }}
                                    valueLabelDisplay="auto"
                                />
                                <Typography variant="subtitle1" sx={{ padding: 2 }}>{obj.sliderMax}</Typography>
                            </Box>
                        </Box>))}

                        <Box textAlign="center">
                            <Typography variant="h8">You are eligible for a loan amount of up to: <br />Rs. {eligibleAmount}</Typography>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </div>
    );
}

export default PersonalLoan