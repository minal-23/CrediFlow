import React from 'react';
import { AppBar, Container, Grid, IconButton, Toolbar, Typography, Link } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';


const Footer = () => {
   

  return (
    <AppBar position="static" sx={{ pb:5, pt:3, backgroundColor: '#5a287d', marginTop:'10vh' }}>
      <Container>
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <Grid item xs={12} sm={6}>
            <Grid container justifyContent="center" alignItems="center" spacing={2}>
              <Grid item>
                <img src='./Capture.jpg' alt="" style={{ maxWidth: '70px' }} />
              </Grid>
                <Grid item>
                  <Typography variant="body1" color="inherit">
                    © {new Date().getFullYear()} NatWest. All rights reserved.
                  </Typography>
                </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container justifyContent="center">
              <Grid item>
                <IconButton color="inherit" aria-label="Facebook">
                  <FacebookIcon />
                </IconButton>
                <IconButton color="inherit" aria-label="Twitter">
                  <TwitterIcon />
                </IconButton>
                <IconButton color="inherit" aria-label="LinkedIn">
                  <LinkedInIcon />
                </IconButton>
                <IconButton color="inherit" aria-label="Instagram">
                  <InstagramIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Container>
        <Grid container sx={{textAlign:'center'}}>
          <Grid item lg={3} md={6} xs={12}>
            <Typography variant="body2">
              <Link href="/services">
                Services
              </Link>
            </Typography>
          </Grid>
          <Grid item lg={3} md={6} xs={12}>
            <Typography variant="body2">
              <Link href="/contact" >
                Contact Us
              </Link>
            </Typography>
          </Grid>
          <Grid item lg={3} md={6} xs={12}>
            <Typography variant="body2">
              <Link href="/privacy">
                Privacy Policy
              </Link>
            </Typography>
          </Grid>
          <Grid item lg={3} md={6} xs={12}>
            <Typography variant="body2">
              <Link href="/terms">
                Terms of Service
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </AppBar>
  );
};

export default Footer;
