import React, { useContext, useEffect } from 'react'
import AdminLoansToApprove from '../AdminLoansToApprove/AdminLoansToApprove'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import UserContext from '../../context/notes/UserContext'
import axios from 'axios';
import { Button } from '@mui/material';

function AdminDashboard() {

  const { loanInfo, setloanInfo, deleteAdminAuth } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8765/api/v1/getAll")
      .then(response => {
        setloanInfo(response.data);
      })
      .catch(e => console.log(e));
  }, [])

  const handleLogout = () => {
    deleteAdminAuth();
    navigate('/admin');
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark custom-navbar-color fixed-top">
        <div className="container">
          <Link to="/admin/dashboard" className="navbar-brand">
            <img src="/Capture.jpg" alt="" width="50" height="50" />
          </Link>
          <div className="navbar-brand" style={{ textAlign: 'start', padding: '2vh' }}>
            <h1 style={{ fontSize: '3vw' }}>ADMIN DASHBOARD</h1>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="allloans" className="nav-link">
                  All Loans
                </Link>
              </li>
              <li className="nav-item">
                <Link to="loanstoapprove" className="nav-link">
                  Loans to Approve
                </Link>
              </li>
              {/* Logout Button */}
                <Button className="nav-link" onClick={handleLogout} style={{ color: 'red', cursor: 'pointer' }}>
                  Logout
                </Button>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  )
}

export default AdminDashboard;
