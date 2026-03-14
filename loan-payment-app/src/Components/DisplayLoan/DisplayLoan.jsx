import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";
import { Grid } from '@mui/material'
import "./DisplayLoan.css"
import { Filter } from '@mui/icons-material';


export default function DisplayLoan(props) {
    const [loanType, setloanType] = useState(props.lType)
    const [himage, sethimage] = useState("https://www.shutterstock.com/image-photo/home-protection-insurance-loan-mortgage-260nw-2163555865.jpg")
    const [gimage, setgimage] = useState("https://i.pinimg.com/736x/29/82/a0/2982a05ad7f1f4485595e75f61aa275e.jpg")
    const [cimage, setcimage] = useState("https://media.istockphoto.com/id/545088372/photo/blurred-abstract-photo-of-outdoor-car-park-in-countryside-backgr.jpg?s=612x612&w=0&k=20&c=3SX8dRHCBBAyugo9iu9NBmfsCAW8RrtxFU7kVpkgV6I=")
    const [pimage, setpimage] = useState("https://thumbs.dreamstime.com/b/blur-coins-calculator-79676408.jpg")
    const navigate = useNavigate()
    return (
        <Grid item xs={12} sm={6} md={4}>
            <div className='card'
                style={{
                    display: 'flex', 
                    backgroundImage: loanType == "home" ? `url(${himage})` : loanType == "gold" ? `url(${gimage})` : loanType == "personal" ? `url(${pimage})` : `url(${cimage})`,
                    backgroundRepeat: "noRepeat",
                    backgroundPosition: "center center",
                    backgroundSize: "cover",
                    opacity:0.8
                }}>

                <div className="card-body" style={{opacity:1}}>
                    <ul className='text' >
                        <p className='mt-2 mb-3' style={{ display: props.status == 'completed' ? 'none' : 'flex' }}>EMI ={props.lEmi} </p>
                        <p className='mb-3'>Total Loan Amount={props.lamount} </p>
                        <p className='mb-3'>Total Interest={props.lInterest} </p>
                        <p className='mb-3'>Total Amount Paid={props.lAmountPaid} </p>
                        <p className='mb-3'>Total Tenure={props.lTenure} </p>
                        <p className='mb-3' style={{ display: props.status == 'completed' ? 'none' : 'flex' }}>Left Tenure={props.tleft} </p>
                        <p className='mb-3'style={{ display: props.status == 'completed' ? 'none' : 'flex' }}>EMIs paid={props.lemis} </p>
                        <p className='mb-3'style={{ display: props.status == 'completed' ? 'none' : 'flex' }}>Missed emi={props.lmissed} </p>
                        <p className='mb-3'style={{ display: props.status == 'completed' ? 'none' : 'flex' }}>emi date={props.ldate} </p>
                        <p className='mb-3' style={{ display: props.lemis >= 6|| props.status == 'completed' ? "none" : "block" }}>You will be eligible for prepayment after {6 - props.lemis} more emis paid </p>
                        <p className='mb-3' style={{ display: props.lemis < 6 ||  props.status == 'completed'? "none" : "block" }}>You are eligible for prepayment</p>


                    </ul>
                    <div style={{ display: 'flex' }}>
                        <Button className='mt-3 btn btn-primary me-2' style={{ display: props.status == 'completed' ? 'none' : 'flex' }} onClick={() => navigate(`/home/myloans/payemi/${props.id}`)}>Pay EMI</Button>
                        <span> </span>
                        <Button className='mt-3 btn btn-primary' style={{ display: props.status == 'completed' || props.lemis <6 ? 'none' : 'flex' }}  onClick={() => navigate(`/home/myloans/prepay/${props.id}`)}>Prepay Loan</Button>
                    </div>

                </div>
            </div>
        </Grid >

    )
}
