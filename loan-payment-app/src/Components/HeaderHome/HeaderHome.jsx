import React, { useContext, useState } from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import logo from './Capture.JPG'
import './HeaderHome.css'
import 'react-chatbot-kit/build/main.css';
import { Button } from '@mui/material';
import UserContext from '../../context/notes/UserContext';

function HeaderHome() {

  const {deleteJwtTokenFromLocal, deleteEmailToLocal} = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    deleteJwtTokenFromLocal();
    deleteEmailToLocal();
    navigate('/');
  }


  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark custom-navbar-color fixed-top">
        <div className="container-fluid">
          <a href="/" className="navbar-brand">
            <img src={logo} alt="" width="50" height="50" />
          </a>
          <div className="header navbar-brand">
            <h4>NatWest</h4>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navmenu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navmenu">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link
                  className="nav-link"
                  data-bs-toggle="tooltip"
                  data-bs-placement="right"
                  title="Manage my Loans"
                  to="myloans" // Updated route syntax
                >
                  Manage my Loans
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  data-bs-toggle="tooltip"
                  data-bs-placement="right"
                  title="Talk to us"
                  to="contact" // Updated route syntax
                >
                  Talk to us
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  href="#"
                  className="nav-link dropdown-toggle custom-navbar-color"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Loan Options
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdown"
                >
                  <li>
                    <Link className="dropdown-item" to="homeloan">
                      Home Loans
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="carloan">
                      Car Loans
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="personalloan">
                      Personal Loans
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="goldloan">
                      Gold Loans
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Button
                  onClick={handleLogout} // Define the handleLogout function
                  style={{ backgroundColor: 'red', color: 'white' }}
                >
                  Logout
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  )
}

export default HeaderHome
