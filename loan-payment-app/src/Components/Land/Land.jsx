import React from 'react';
import './Land.css';
import { useEffect,useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Outlet } from 'react-router-dom';
import slide1 from './slide1.jpg';
import slide2 from './slide2.jpg';
import slide3 from './slide3.jpg';
import Calculator from './Calculator';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CalculateIcon from '@mui/icons-material/Calculate';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { Typography,gutterbottom,Container } from '@mui/material';

export default function Land() {
  useEffect(() => {
    const ele = document.getElementById('hero-carousel');
    const carouselInstance = new window.bootstrap.Carousel(ele, {
      interval: 3000,//time interval for slide change
    });
    return () => {
      carouselInstance.dispose();//called when component unmounts
    };
  }, []);
  const calculatorRef = useRef(null);
  //to scroll to a component on the same page
  useEffect(() => {
    //to scroll to the Calculator component
    const scrollToCalculator = () => {
      calculatorRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    // get element by Id, on click scroll down 
    const calculateNowButton = document.getElementById('calculateNowButton');
    calculateNowButton.addEventListener('click', scrollToCalculator);
    return () => {//called when component unmounts
      calculateNowButton.removeEventListener('click', scrollToCalculator);
    };
  }, []);
  
  return (
    <>
      <div className="navigate container-fluid" style={{ marginTop: '70px' }}>
        <div className="row">
          <div className="col-md-12">
            <h4 className='headtext'>Unlocking Financial Freedom: Explore our Loan Options</h4>
          </div>
        </div>
      </div>
      {/* Slides */}
      <div className="hero-section text-dark">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-12">
              <div id="hero-carousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
                <div className="carousel-inner">
                  {/* First slide */}
                  <div className="carousel-item active text-center">
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <hr />
                        <h6 className="small-text col-md-6 text-center">Loans</h6>
                        <h1 className="Title">Apply in a flash now</h1>
                      </div>
                      <div className="col-md-6">
                        <img src={slide1} alt="" className="img-fluid" />
                      </div>
                      <div className="col-md-6">
                        <Link id="routing" className="route btn" to="/register" role="button">
                        <AppRegistrationIcon/> Register and avail a Loan
                        </Link>
                      </div>
                    </div>
                  </div>
                  {/* Second slide */}
                  <div className="carousel-item text-center">
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <hr />
                        <h6 className="small-text col-md-6 text-center">Existing Customer</h6>
                        <h1 className="Title">Manage my Loans</h1>
                      </div>
                      <div className="col-md-6">
                        <img src={slide2} alt="" className="img-fluid" />
                      </div>
                      <div className="col-md-6">
                        <Link id="routing" className="route btn" to="/login" role="button">
                        <LockOutlinedIcon/> Login to Online Banking
                        </Link>
                      </div>
                    </div>
                  </div>
                  {/* Third slide */}
                  <div className="carousel-item text-center">
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <hr />
                        <h6 className="small-text col-md-6 text-center">Loan Calculator</h6>
                        <h1 className="Title">Get a Quick Quote</h1>
                      </div>
                      <div className="col-md-6">
                        <img src={slide3} alt="" className="img-fluid" />
                      </div>
                      <div className="col-md-6">
                        <Link  id="calculateNowButton"
                                className="route btn"
                                  role="button">
                          <CalculateIcon/> Calculate Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button class="carousel-control-prev" type="button" data-bs-target="#hero-carousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#hero-carousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
         {/* Calculator component */}
         <div ref={calculatorRef}>
        <Calculator />
        <>
        <br/>
        <Container maxWidth="md">
        <Typography style={{fontSize:'30px',fontFamily:'Alfa Slab One, cursive',color:'#5a287d'}}gutterbottom>Chat with us online</Typography>
          <br/>
          <Typography variant="h6">Archie, our digital assistant is a digital
          chatbot trained to answer banking questions and is available 24/7 to help answer your questions about banking.
          You can chat to her online anytime and if she can't help,she'll pass you on to a real person.On an 
          average she can answer questions within 5 minutes.<br/>
          You can usually find Archie waiting to help at the bottom rightside of most of the webpages. </Typography>
          <br/>
          </Container>
        </>
      </div>
    </>
  );
}