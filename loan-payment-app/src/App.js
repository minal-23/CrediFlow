import './App.css';
import React from "react"; 
import Header from './Components/Header/Header';
import { BrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Footer from './Components/Footer/Footer';
import Register from './Components/Register/Register';
import SetupPin from './Components/SetupPin/SetupPin';
import Login from './Components/Login/Login';
import HeaderHome from './Components/HeaderHome/HeaderHome';
import ManageLoans from './Components/ManageLoans/ManageLoans';
import GoldLoan from './Components/GoldLoan/GoldLoan';
import HomeLoan from './Components/HomeLoan/HomeLoan';
import CarLoan from './Components/CarLoan/CarLoan';
import PersonalLoan from './Components/PersonalLoan/PersonalLoan';
import Calculator from './Components/Calculator/Calculator'
import Land from './Components/Land/Land';
import GoldLoanForm from './Components/GoldLoan/GoldLoanForm'
import PrepayLoanForm from './Components/PrepayLoanForm/PrepayLoanForm';
import PayEmi from './Components/PayEmi/PayEmi';
import PersonalLoanForm from './Components/PersonalLoan/PersonalLoanForm';
import PersonalLoanUpload from './Components/PersonalLoan/PersonalLoanUpload';
import GoldLoanUpload from './Components/GoldLoan/GoldLoanUpload';
import HomeLoanForm from './Components/HomeLoan/HomeLoanForm';
import CarLoanForm from './Components/CarLoan/CarLoanForm';
import PasswordReset from './Components/PasswordReset/PasswordReset'
import CarLoanDocUpload from './Components/CarLoan/CarLoanDocUpload';
import HomeLoanUpload from './Components/HomeLoan/HomeLoanUpload';
import ContactUs from './Components/ContactUs/ContactUs'
import AdminLogin from './Components/AdminLogin/AdminLogin';
import AdminDashboard from './Components/AdminDashboard/AdminDashboard';
import UserContext from './context/notes/UserContext';
import { useContext } from 'react';
import AdminLoansToApprove from './Components/AdminLoansToApprove/AdminLoansToApprove';
import AdminAllLoans from './Components/AdminAllLoans/AdminAllLoans';


function App() {
  const { otpAuth} = useContext(UserContext);
  const token = localStorage.getItem("jwt_token");
  const adminAuth = localStorage.getItem("adminAuth");
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Header/>}>
        <Route index element={<Land/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='login/resetpassword' element={<PasswordReset/>}/>
        <Route path='register' element={<Register/>}/>
        <Route path='register/setuppin' element={<SetupPin/>}></Route>
        <Route path='calculator' element={<Calculator/>}/>
        <Route path='contact' element={<ContactUs/>}/>
      </Route>
      {token ? <Route path='/home' element={<HeaderHome/>}>
        <Route index element={<ManageLoans/>}/>
         <Route path='contact' element={<ContactUs/>}/>
        <Route path='myloans' element={<ManageLoans/>}/>
        <Route path='myloans/prepay/:id' element={<PrepayLoanForm/>}/>
        <Route path='myloans/payemi/:id' element={<PayEmi/>}/>
        <Route path='goldloan' element={<GoldLoan/>}/>
        <Route path='goldloan/form' element={<GoldLoanForm/>}></Route>
        <Route path='goldloan/form/upload' element={<GoldLoanUpload/>}/>
        <Route path='homeloan' element={<HomeLoan/>}/>
        <Route path='homeloan/upload' element={<HomeLoanForm/>}/>
        <Route path='homeloan/upload/form' element={<HomeLoanUpload/>}/>
        <Route path='carloan' element={<CarLoan/>}/>
        <Route path='carloan/form' element={<CarLoanForm/>}/>
        <Route path='carloan/form/upload' element={<CarLoanDocUpload/>}/>
        <Route path='personalloan' element={<PersonalLoan/>}/>
        <Route path='personalloan/upload' element={<PersonalLoanForm/>}/>
        <Route path='personalloan/upload/form' element={<PersonalLoanUpload/>}/>
      </Route>: 
      <Route path='*' element={<Navigate to='/login'/>}/>}

      <Route path='/admin' element={<AdminLogin/>}/>
      {adminAuth? <Route path='/admin/dashboard' element={<AdminDashboard/>}>
        <Route index element={<AdminLoansToApprove/>}/>
        <Route path='allloans' element={<AdminAllLoans/>}/>
        <Route path='loanstoapprove' element={<AdminLoansToApprove/>}/>
      </Route>
      :
      <Route path='admin/*' element={<Navigate to='/admin'/>}/>}
    </Routes>
    <Footer/>
    </BrowserRouter> 
    
  );
}

export default App;
