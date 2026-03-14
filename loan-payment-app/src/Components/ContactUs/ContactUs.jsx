import React,{useState} from 'react'
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
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
const ContactUs = () => {
  const navigate = useNavigate();
  const [onecard, setonecard] = useState(false);
  const [twocard, settwocard] = useState(false);
  const [threecard, setthreecard] = useState(false);

  const onehandleclick = () => {
    setonecard(!onecard);
  };
  const twohandleclick = () => {
    settwocard(!twocard);
  };
  const threehandleclick = () => {
    setthreecard(!threecard);
  };
  return (
    <div style={{marginTop:'75px'}}>
      <CssBaseline />
      <main>
        <Container maxWidth="xl" style={{backgroundColor:'#5a287d',height:'200px',display: 'flex', alignItems: 'center'}}>
          <Container maxWidth="lg">
        <Grid container>
    <Grid item xs={12} sm={12} md={6}> 
    <Typography variant='h6'style={{color:'white',justifyContent: 'center'}}>
        How can we help you ?
      </Typography>
      <Typography style={{fontSize:'42px',fontFamily:'Alfa Slab One, cursive',color:'white',justifyContent: 'center'}}>
        Contact Us
      </Typography>
    </Grid>
  </Grid>
  </Container>
        </Container>
        <Container maxWidth="lg">
        <br/><br/>
          <Typography style={{fontSize:'30px',fontFamily:'Alfa Slab One, cursive',color:'#5a287d'}}gutterbottom>Chat with us online</Typography>
          <br/>
          <Typography variant="h6">Archie, our digital assistant is a digital
          chatbot trained to answer banking questions and is available 24/7 to help answer your questions about banking.
          You can chat to her online anytime and if she can't help,she'll pass you on to a real person.On an 
          average she can answer questions within 5 minutes.<br/>
          You can usually find Archie waiting to help at the bottom rightside of most of the webpages. </Typography>
          <br/>
        </Container>
        <Container maxWidth="lg">
      <br/><br/>
      <Typography style={{fontSize:'30px',fontFamily:'Alfa Slab One, cursive',color:'#5a287d'}}gutterbottom>Day-to-Day Contacts</Typography>
      <br/>
        <Typography style={{fontSize:'25px',fontFamily:'sans-serif'}}>HelpDesk</Typography>
        <br/>
        </Container>
        <Container style={{color:'#5a287d'}}>
      <List sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper' ,color:'#5a287d'}}>
      <ListItem alignItems="flex-start">
        <ListItemText
          secondary={
            <React.Fragment>
              <Typography
               sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                component="span"
                fontSize='20px'
                color="#5a287d"
              >
                 Online Banking <ArrowDropDownCircleIcon onClick={onehandleclick}/>
              </Typography>
             
            </React.Fragment>
          }
        />
      </ListItem>
      {onecard && (
        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Online Banking 
            </Typography>
            <Typography variant="h6" color="#5a287d">
              HelpDesk
            </Typography>
            <Typography variant="body2" color="text.secondary">
                  0345 366 7004<br/>
                  Call +44 (0) 2381 244182 from abroad<br/>
                  Lines are open Monday to Saturday 8am - 6pm, Closed Sunday and UK Bank Holidays. Calls may be recorded.
            </Typography>
          </CardContent>
        </Card>
      )}
      <Divider component="li" />
      <ListItem alignItems="flex-start">
        <ListItemText
          secondary={
            <React.Fragment>
              <Typography
               sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
               component="span"
               fontSize='20px'
               color="#5a287d"
              >
                Mobile Banking  <ArrowDropDownCircleIcon onClick={twohandleclick}/>
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      {twocard && (
        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Mobile Banking 
            </Typography>
            <Typography variant="h6" color="#5a287d">
              HelpDesk
            </Typography>
            <Typography variant="body2" color="text.secondary">
                  0345 366 7004<br/>
                  Call +44 (0) 2381 244182 from abroad<br/>
                  Lines are open Monday to Saturday 8am - 6pm, Closed Sunday and UK Bank Holidays. Calls may be recorded.
            </Typography>
          </CardContent>
        </Card>
      )}
      <Divider component="li" />
      <ListItem alignItems="flex-start">
        <ListItemText
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                component="span"
                fontSize='20px'
                color="#5a287d"
              >
                Loan Approval  <ArrowDropDownCircleIcon onClick={threehandleclick}/>
              </Typography>
            </React.Fragment>
          }
        />
        </ListItem>
        {threecard && (
        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Loan Approval
            </Typography>
            <Typography variant="h6" color="#5a287d">
              HelpDesk
            </Typography>
            <Typography variant="body2" color="text.secondary">
                  0345 366 7004<br/>
                  Call +44 (0) 2381 244182 from abroad<br/>
                  Lines are open Monday to Saturday 8am - 6pm, Closed Sunday and UK Bank Holidays. Calls may be recorded.
            </Typography>
          </CardContent>
        </Card>
      )}
        <Divider component="li" />
    </List>
   
        </Container>
        <Container>
          <br/><br/>
        <Typography style={{fontSize:'30px',fontFamily:'Alfa Slab One, cursive',color:'#5a287d'}}gutterbottom>Drop us a mail</Typography>
        <Typography style={{color:'grey',fontSize:'25px'}}>
        <AttachEmailIcon/>  in.service@natwestmarkets.com</Typography>
        </Container>
      </main>
    </div>
  );
}

export default ContactUs
