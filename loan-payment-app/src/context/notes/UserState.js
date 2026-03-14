import React, { useState } from "react";
import UserContext from "./UserContext";

const UserState = ({ children }) => {

    const [otpAuth, setotpAuth] = useState(false); // Initial data
    const [loanInfo, setloanInfo] = useState([]);

    const setJwtTokenToLocal = (token) => {
        localStorage.setItem("jwt_token", token);
    }

    const deleteJwtTokenFromLocal = () => {
        localStorage.removeItem("jwt_token");
    }

    const setAdminAuth = (username) => {
        localStorage.setItem("adminAuth", username);
    }

    const deleteAdminAuth = () => {
        localStorage.removeItem("adminAuth");
    }

    const setEmailToLocal = (email) => {
        localStorage.setItem("userEmail", email);
    }

    const deleteEmailToLocal = () => {
        localStorage.removeItem("userEmail");
    }


    // Define functions to modify the data

    return (
        <UserContext.Provider value={{otpAuth,setotpAuth,loanInfo,setloanInfo, setJwtTokenToLocal, deleteJwtTokenFromLocal, setAdminAuth, deleteAdminAuth, setEmailToLocal, deleteEmailToLocal}}>
            {children}
        </UserContext.Provider>
    )

}

export default UserState;