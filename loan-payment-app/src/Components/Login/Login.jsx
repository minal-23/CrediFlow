import React, {useContext, useState} from 'react';
import { Avatar, Box, Button, Checkbox, CssBaseline, FormControlLabel, Grid,  Link, Paper, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Formik, Form, Field } from 'formik';
import validator from 'validator';
import * as Yup from 'yup';
import loginImage from './LoginImage.avif';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../../context/notes/UserContext';
function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
            Natwest
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
        </Typography>
    );
}

const defaultTheme = createTheme();

export default function Login() {
    const navigate = useNavigate();
    const {setJwtTokenToLocal,setEmailToLocal} = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pin, setPin] = useState('');
    const [pinLogin, setPinLogin] = useState(false);
    const [forgotPassword, setForgotPassword] = useState(false);
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        pin: '',
     });

    const initialValues = {
        email:'',
        password:'',
        pin:''
    }
    const validateEmail = (value) => {
        if (!value) 
            return 'Email is required.';
        if (!validator.isEmail(value))
            return 'Invalid email format.';
        return '';
    };
    const validatePassword = (value) => {
        if (!value) 
            return 'Password is required.';
        // if (value.length < 8 || value.length > 20)
        //     return 'Password must be between 8 and 20 characters.';
        // if (!/\d/.test(value)) 
        //     return 'Password must contain at least one digit.';
        // if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(value)) 
        //     return 'Password must contain at least one special character.';
        // if(!/[A-Z]/.test(value))
        //     return 'Password must contain at least one uppercase letter.';
        // if(!/[a-z]/.test(value))
        //     return 'Password must contain at least one lowercase letter.';
        return '';
    };
    const validatePin = (value) => {
        if (!value) 
            return 'PIN is required.';
        if (value.length !== 4) 
            return 'PIN must be 4 digits.';
        if (!/\d{4}/.test(value))
            return 'PIN must have only numbers';
        return '';
    };
    const handleEmailBlur = () => {
        const temp = validateEmail(email);
        setErrors({ ...errors, email: temp });
    }
    const handlePasswordBlur = () => {
        const temp = validatePassword(password);
        setErrors({ ...errors, password: temp });
    };

    const handlePinBlur = () => {
        const temp = pinLogin ? validatePin(pin) : '';
        setErrors({ ...errors, pin: temp });
    }; 
  const handleSubmit = (event) => {
    // cout<<"clicked";
    console.log("clickedddddddddddd");    
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const userCreds = {
      email: email,
      password: password,
      pin: pin
    }
    try{
      console.log(userCreds);
      axios.post('http://localhost:8765/api/v1/users/login',userCreds)
      .then(response => {
        console.log("heyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy",response);
        navigate('/home');
        setJwtTokenToLocal(response.data.token);
        setEmailToLocal(userCreds.email);
      })
      .catch(e => console.log(e));
    }
    catch(e){
      console.log(e);
    }
  };
  const handleCheckboxChange = () => {
    setPinLogin(!pinLogin);
};

// const handleLogin = () => {
//     // if(pinLogin===true)
//     //     if(!errors.pin || (!errors.email && !errors.password))
//     //         window.alert("Login Successful!!")
//     // else
//     //     if (!errors.email && !errors.password) 
//     //         window.alert("Login Successful!!")

//     if(pinLogin===true)
//         if(!errors.pin || (!errors.email && !errors.password)){
//           const userCreds = {
//             email: email,
//             password: password,
//             pin: pin
//           }
//           try{
//             console.log(userCreds);
//             axios.post('http://localhost:8765/api/v1/users/login/pin',userCreds)
//             .then(response => {
//               navigate('/home');
//               setJwtTokenToLocal(response.data.token);
//               setEmailToLocal(userCreds.email);
//             })
//             .catch(e => console.log(e));
//           }
//           catch(e){
//             console.log(e);
//           } 
//         }
//     else
//         if (!errors.email && !errors.password){}     
// }

  return (
    <ThemeProvider theme={defaultTheme}>
  <Grid container component="main" sx={{ paddingRight: '20px', paddingLeft: '20px', paddingTop: '100px'}}>
    <CssBaseline />
    <Grid
      item
      xs={12}
      sm={12}
      md={6} // Adjust the width for medium screens
      lg={7} // Expand the image column for large screens
      sx={{
        backgroundImage: `url(${loginImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain', // Set to 'contain' to resize without zooming
        backgroundPosition: 'center',
        minHeight: '50vh',

      }}
    />
    <Grid item xs={12} sm={12} md={6} lg={5} component={Paper} elevation={6} square>
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: '#6824a3' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            autoFocus
            onBlur={handleEmailBlur}
          />
          {errors.email && <div style={{ color: 'red', fontSize: '14px' }}>{errors.email}</div>}
          {pinLogin ? (
            <div>
              <TextField
                margin="normal"
                required
                fullWidth
                id="pin"
                label="Pin"
                name="pin"
                onChange={(e) => setPin(e.target.value)}
                onBlur={handlePinBlur}
              />
              {errors.pin && <div style={{ color: 'red', fontSize: '14px' }}>{errors.pin}</div>}
            </div>
          ) : (
            <div>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                onBlur={handlePasswordBlur}
              />
              {errors.password && <div style={{ color: 'red', fontSize: '14px' }}>{errors.password}</div>}
            </div>
          )}
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="secondary" />}
            label="Sign in with pin"
            checked={pinLogin}
            onChange={handleCheckboxChange}
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: '#6824a3' }}
            // onClick={handleLogin}
          >
            Sign In
          </Button>
          <Grid container>
            {/* <Grid item xs>
              <Link onClick={() => navigate('/resetpassword')} variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
            <Grid item>
              <Link onClick={() => navigate('/register')} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          <Copyright sx={{ mt: 5 }} />
        </Box>
      </Box>
    </Grid>
  </Grid>
</ThemeProvider>

  );
}
