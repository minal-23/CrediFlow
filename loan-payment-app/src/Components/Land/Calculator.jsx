import React, { useState } from 'react'
import {
    Container, Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper,
    Button, Dialog, DialogActions, DialogContent, DialogTitle, Slider, Box, TextField
} from '@mui/material';
import { Link, Outlet, useNavigate } from 'react-router-dom';


export default function Calculator() {
    const [sliderDetails, setsliderDetails] = useState(
        [
            {
                sliderTitle: "Loan Amount",
                textFieldMin: 0,
                textFieldMax: 10000000,
                textFieldStep: 10000,
                sliderMin: 0,
                sliderMax: 10000000,
                sliderStep: 50000,
                inputValue: 0,
                sliderValue: 0
    
            },
            {
                sliderTitle: "Rate of Interest (per month)",
                textFieldMin: 7,
                textFieldMax: 40,
                textFieldStep: 1,
                sliderMin: 7,
                sliderMax: 40,
                sliderStep: 0.5,
                inputValue: 10,
                sliderValue: 10
    
            },
            {
                sliderTitle: "Tenure (in months)",
                textFieldMin: 12,
                textFieldMax: 120,
                textFieldStep: 1,
                sliderMin: 12,
                sliderMax: 120,
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
        // const [amount, setamount] = useState(0)
        // const [interest, setinterest] = useState(0)
        // const [time, settime] = useState(0)
        // const [emi, setemi] = useState(0)
    
        // const calculateEmi = (event) => {
        //     event.preventDefault();
        //     let interestCal = interest / 1200;
        //     console.log(interestCal);
        //     //P x R x (1+R)^N / [((1+R)^N)-1]
        //     let cemi = (amount * interestCal * Math.pow((1 + interestCal), time)) / (Math.pow((1 + interestCal), time) - 1);
        //     cemi = (Number.parseInt)(cemi);
        //     setemi(cemi);
        // }
        //slider0=amount;
        //slider1=ROI;
        //slider2=Tenure;
        // seteligibleAmount()
        const interestCal = sliderDetails[1].inputValue / 1200;
        const pamt = sliderDetails[0].inputValue;
        const tenure = sliderDetails[2].inputValue;

            seteligibleAmount((Number.parseInt)(pamt * interestCal * Math.pow(1 + interestCal, tenure)
            / (Math.pow(1 + interestCal, tenure) - 1)))
}
                
  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
    <Container maxWidth="md">
    <DialogTitle style={{fontFamily:'Alfa Slab One,cursive',color:'#6824a3',fontSize:'30px'}}>Get a Quick Estimation with our Loan Calculator</DialogTitle>
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
                            <Typography variant="h8">Estimated EMI: <br />Rs. {eligibleAmount}</Typography>
                        </Box>
                    </DialogContent>
        </Container>
    </div>

  )
}

