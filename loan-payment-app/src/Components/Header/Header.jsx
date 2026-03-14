import React from 'react';
import './Header.css';
import { Link, Outlet } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export default function Header() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark custom-navbar-color fixed-top">
        <div className="container-fluid">
          <a href="/" className="navbar-brand">
            <img src="/Capture.jpg" alt="" width="50" height="50" />
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
                  title="Login"
                  to="/login" // Updated route syntax
                >
                  <LockOutlinedIcon/> Login
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  data-bs-toggle="tooltip"
                  data-bs-placement="right"
                  title="Register"
                  to="/register" // Updated route syntax
                >
                  Register
                </Link>
                </li>
                <li className="nav-item">
                <Link
                  className="nav-link"
                  data-bs-toggle="tooltip"
                  data-bs-placement="right"
                  title="Contact Us"
                  to="/contact" // Updated route syntax
                >
                  Contact Us
                </Link>
                </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />  
      
    </>
  );
}
