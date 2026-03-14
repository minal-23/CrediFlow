import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';
import { padding } from '@mui/system';

const PinSetupPage = () => {
  const [pin, setPin] = useState('');
  const [confirmedPin, setConfirmedPin] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handlePinChange = (e) => {
    const newPin = e.target.value;
    if (/^\d{0,4}$/.test(newPin)) {
      setPin(newPin);
      setErrors({});
    }
  };

  const handleConfirmedPinChange = (e) => {
    const newConfirmedPin = e.target.value;
    if (/^\d{0,4}$/.test(newConfirmedPin)) {
      setConfirmedPin(newConfirmedPin);
      setErrors({});
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!pin) {
      newErrors.pin = 'Please enter your 4-digit PIN.';
    } else if (!/^\d{4}$/.test(pin)) {
      newErrors.pin = 'PIN must be 4 digits.';
    }

    if (!confirmedPin) {
      newErrors.confirmedPin = 'Please confirm your 4-digit PIN.';
    } else if (!/^\d{4}$/.test(confirmedPin)) {
      newErrors.confirmedPin = 'Confirmation PIN must be 4 digits.';
    }

    if (pin !== confirmedPin && pin.length === 4 && confirmedPin.length === 4) {
      newErrors.pinMismatch = 'PINs do not match.';
    }

    if (Object.keys(newErrors).length === 0) {
      const numericPin = parseInt(pin, 10);
      console.log('Numeric PIN set up successfully:', numericPin);
      setSuccessMessage('PIN set up successfully!');
    } else {
      setErrors(newErrors);
      setSuccessMessage(''); 
    }
  };

  return (
    <Container maxWidth="sm" className="pin-setup-container" style={{padding:'100px'}}>
      <Typography variant="h4" align="center" gutterBottom style={{ marginTop: '40px', color: '#6824a3' }}>
        Setup Your 4-Digit PIN
      </Typography>
      <Typography variant="h5" align="center" gutterBottom style={{ color: '#6824a3' }}>
        For a Hassle free login
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} justifyContent="center" style={{padding: '20px'}}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="text"
              label="Enter 4-digit PIN"
              variant="outlined"
              error={!!errors.pin}
              helperText={errors.pin}
              maxLength="4"
              value={pin}
              onChange={handlePinChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="text"
              label="Confirm 4-digit PIN"
              variant="outlined"
              error={!!errors.confirmedPin || !!errors.pinMismatch}
              helperText={errors.confirmedPin || errors.pinMismatch}
              maxLength="4"
              value={confirmedPin}
              onChange={handleConfirmedPinChange}
            />
          </Grid>
        </Grid>
        {successMessage && (
          <Typography variant="body1" color="primary" align="center">
            {successMessage}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: '20px', padding: '10px' , backgroundColor: '#6824a3'}}
        >
          Set PIN
        </Button>
      </form>
    </Container>
  );
};

export default PinSetupPage;
