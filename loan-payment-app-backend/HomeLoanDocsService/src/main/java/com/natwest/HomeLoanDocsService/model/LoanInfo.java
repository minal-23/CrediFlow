package com.natwest.HomeLoanDocsService.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import org.springframework.data.annotation.Id;

import java.io.Serializable;

@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class, property = "@id", scope = LoanInfo.class)
public class LoanInfo implements Serializable {

    @Id
    private String loanId;
    private String loanType;  //personal home car gold
    private String loanStatus;  //pending, accepted, rejected
    private String loanEmi; //loan emi
    private String loanTenure; //months
    private String loanTenurePending; //tenure pending
    private String totalPrincipal;
    private String totalAmountPaid;
    private String principalLeft;
    private String rateOfInterest;
    private String paidEmiNumber;
    private String missedEmi;
    private String emiDate;
    private String emailid;
    private String aadhaar;

    public LoanInfo() {
    }

    public LoanInfo(String loanId, String loanType, String loanStatus, String loanEmi, String loanTenure, String loanTenurePending, String totalPrincipal, String totalAmountPaid, String principalLeft, String rateOfInterest, String paidEmiNumber, String missedEmi, String emiDate, String emailid, String aadhaar) {
        this.loanId = loanId;
        this.loanType = loanType;
        this.loanStatus = loanStatus;
        this.loanEmi = loanEmi;
        this.loanTenure = loanTenure;
        this.loanTenurePending = loanTenurePending;
        this.totalPrincipal = totalPrincipal;
        this.totalAmountPaid = totalAmountPaid;
        this.principalLeft = principalLeft;
        this.rateOfInterest = rateOfInterest;
        this.paidEmiNumber = paidEmiNumber;
        this.missedEmi = missedEmi;
        this.emiDate = emiDate;
        this.emailid = emailid;
        this.aadhaar = aadhaar;
    }

    public String getLoanId() {
        return loanId;
    }

    public void setLoanId(String loanId) {
        this.loanId = loanId;
    }

    public String getLoanType() {
        return loanType;
    }

    public void setLoanType(String loanType) {
        this.loanType = loanType;
    }

    public String getLoanStatus() {
        return loanStatus;
    }

    public void setLoanStatus(String loanStatus) {
        this.loanStatus = loanStatus;
    }

    public String getLoanEmi() {
        return loanEmi;
    }

    public void setLoanEmi(String loanEmi) {
        this.loanEmi = loanEmi;
    }

    public String getLoanTenure() {
        return loanTenure;
    }

    public void setLoanTenure(String loanTenure) {
        this.loanTenure = loanTenure;
    }

    public String getLoanTenurePending() {
        return loanTenurePending;
    }

    public void setLoanTenurePending(String loanTenurePending) {
        this.loanTenurePending = loanTenurePending;
    }

    public String getTotalPrincipal() {
        return totalPrincipal;
    }

    public void setTotalPrincipal(String totalPrincipal) {
        this.totalPrincipal = totalPrincipal;
    }

    public String getTotalAmountPaid() {
        return totalAmountPaid;
    }

    public void setTotalAmountPaid(String totalAmountPaid) {
        this.totalAmountPaid = totalAmountPaid;
    }

    public String getPrincipalLeft() {
        return principalLeft;
    }

    public void setPrincipalLeft(String principalLeft) {
        this.principalLeft = principalLeft;
    }

    public String getRateOfInterest() {
        return rateOfInterest;
    }

    public void setRateOfInterest(String rateOfInterest) {
        this.rateOfInterest = rateOfInterest;
    }

    public String getPaidEmiNumber() {
        return paidEmiNumber;
    }

    public void setPaidEmiNumber(String paidEmiNumber) {
        this.paidEmiNumber = paidEmiNumber;
    }

    public String getMissedEmi() {
        return missedEmi;
    }

    public void setMissedEmi(String missedEmi) {
        this.missedEmi = missedEmi;
    }

    public String getEmiDate() {
        return emiDate;
    }

    public void setEmiDate(String emiDate) {
        this.emiDate = emiDate;
    }

    public String getEmailid() {
        return emailid;
    }

    public void setEmailid(String emailid) {
        this.emailid = emailid;
    }

    public String getAadhaar() {
        return aadhaar;
    }

    public void setAadhaar(String aadhaar) {
        this.aadhaar = aadhaar;
    }
}

