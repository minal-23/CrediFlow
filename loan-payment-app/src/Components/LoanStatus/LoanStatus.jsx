import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";
import { Grid } from '@mui/material'


export default function LoanStatus(props) {
    const [status, setstatus] = useState(props.lStatus)
    const navigate = useNavigate()
    return (
        <Grid item xs={12} sm={6} md={4}>
            <div className='card'>
                <div className="card-body" style={{ background: status == "rejected" ? 'red' : 'powderblue' }}>
                    <h5 className="card-title">Details about your Loan are</h5>
                    <ul className='card-text'>
                        <p className='mt-3 mb-3'>Loan Amount={props.lamount} </p>
                        <p className='mb-3'>Interest={props.lInterest} </p>
                        <p className='mb-3'>Tenure={props.lTenure} </p>
                    </ul>
                </div>
            </div>
        </Grid>

    )
}
