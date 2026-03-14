import React, { useState } from 'react'
import './Calculator.css'
import Grid from '@mui/material/Grid';

export default function Calculator() {
    const [amount, setamount] = useState(0)
    const [interest, setinterest] = useState(0)
    const [time, settime] = useState(0)
    const [emi, setemi] = useState(0)

    const calculateEmi = (event) => {
        event.preventDefault();
        let interestCal = interest / 1200;
        console.log(interestCal);
        //P x R x (1+R)^N / [((1+R)^N)-1]
        let cemi = (amount * interestCal * Math.pow((1 + interestCal), time)) / (Math.pow((1 + interestCal), time) - 1);
        cemi = (Number.parseInt)(cemi);
        setemi(cemi);
    }

    let totalAmount = (Number.parseInt)(emi * 120)
    let totalInterest = totalAmount - amount;

    let output;
    if (emi == 0 ) {
        output = <div></div>
    }
    if (emi>0) {
        output = <div className="card">
            <div className="card-body">
                <h5 className="card-title">Details about this Loan are</h5>
                <ul className='card-text'>
                    <li className='mt-5 mb-3'>EMI = {emi}</li>
                    <li className='mb-3'>Total Loan Amount= {amount}</li>
                    <li className='mb-3'>Total Interest={totalInterest}</li>
                    <li className='mb-3'>Total Amount Paid={totalAmount}</li>
                </ul>
            </div>
        </div>
    }

    return (
        <div className='calcContainer'>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={10} md={8}>
                    <div className="calc card">
                        <form onSubmit={calculateEmi} className='calForm'>
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label">Amount of Loan</label>
                                <input type="number" className="form-control" required id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => {(e.target.value>=0)?setamount(e.target.value):setamount(0)}} />
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label">Annual Interest Rate</label>
                                <input type="number" className="form-control" required id="exampleInputPassword1" onChange={(e) =>{e.target.value>0? setinterest(e.target.value):setinterest(0)}} step="0.001" min={0.00} />
                            </div>
                            <div className="mb-3">
                                <label for="timePeriod" className="form-label">Time(in Months)</label>
                                <input type="number" className="form-control" required id="timePeriod" onChange={(e) => {e.target.value>0?settime(e.target.value):settime(0)}} />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </Grid>
                <Grid item xs={12} sm={10} md={4}>
                    {output}
                </Grid>
            </Grid>
        </div>
    )
}
