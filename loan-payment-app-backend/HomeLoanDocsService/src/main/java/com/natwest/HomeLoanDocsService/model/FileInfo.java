package com.natwest.HomeLoanDocsService.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "homeLoanDocs")
public class FileInfo {
    @Id
    private String id;
    private String loanType;
    private String aadhaarNumber;
    private String tenure;
    private String emi;
    private FileProps aadhaarCard = new FileProps();
    private FileProps panCard = new FileProps();
    private FileProps signatureProof = new FileProps();
    private FileProps addressProof = new FileProps();
    private FileProps bankStatements = new FileProps();
    private FileProps paymentReceipts = new FileProps();
    private FileProps occupancyCertificate = new FileProps();
    private FileProps approvedPlanCopy = new FileProps();
    private FileProps form16 = new FileProps();

    public FileInfo() {
    }

    public FileInfo(String id, String loanType, String aadhaarNumber, String tenure, String emi, FileProps aadhaarCard,
                    FileProps panCard, FileProps signatureProof, FileProps addressProof, FileProps bankStatements,
                    FileProps paymentReceipts, FileProps occupancyCertificate, FileProps approvedPlanCopy, FileProps form16  ) {
        this.id = id;
        this.loanType = loanType;
        this.aadhaarNumber = aadhaarNumber;
        this.tenure = tenure;
        this.emi = emi;
        this.aadhaarCard = aadhaarCard;
        this.panCard = panCard;
        this.signatureProof = signatureProof;
        this.addressProof = addressProof;
        this.bankStatements = bankStatements;
        this.paymentReceipts = paymentReceipts;
        this.occupancyCertificate = occupancyCertificate;
        this.approvedPlanCopy = approvedPlanCopy;
        this.form16 = form16;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLoanType() {
        return loanType;
    }

    public void setLoanType(String loanType) {
        this.loanType = loanType;
    }

    public String getAadhaarNumber() {
        return aadhaarNumber;
    }

    public void setAadhaarNumber(String aadhaarNumber) {
        this.aadhaarNumber = aadhaarNumber;
    }

    public String getTenure() {
        return tenure;
    }

    public void setTenure(String tenure) {
        this.tenure = tenure;
    }

    public String getEmi() {
        return emi;
    }

    public void setEmi(String emi) {
        this.emi = emi;
    }

    public FileProps getAadhaarCard() {
        return aadhaarCard;
    }

    public void setAadhaarCard(FileProps aadhaarCard) {
        this.aadhaarCard = aadhaarCard;
    }

    public FileProps getPanCard() {
        return panCard;
    }

    public void setPanCard(FileProps panCard) {
        this.panCard = panCard;
    }

    public FileProps getSignatureProof() {
        return signatureProof;
    }

    public void setSignatureProof(FileProps signatureProof) {
        this.signatureProof = signatureProof;
    }

    public FileProps getAddressProof() {
        return addressProof;
    }

    public void setAddressProof(FileProps addressProof) {
        this.addressProof = addressProof;
    }

    public FileProps getBankStatements() {
        return bankStatements;
    }

    public void setBankStatements(FileProps bankStatements) {
        this.bankStatements = bankStatements;
    }

    public FileProps getPaymentReceipts() {
        return paymentReceipts;
    }

    public void setPaymentReceipts(FileProps paymentReceipts) {
        this.paymentReceipts = paymentReceipts;
    }

    public FileProps getOccupancyCertificate() {
        return occupancyCertificate;
    }

    public void setOccupancyCertificate(FileProps occupancyCertificate) {this.occupancyCertificate = occupancyCertificate;}

    public FileProps getApprovedPlanCopy() {
        return approvedPlanCopy;
    }

    public void setApprovedPlanCopy(FileProps approvedPlanCopy) {
        this.approvedPlanCopy = approvedPlanCopy;
    }

    public FileProps getForm16() {
        return form16;
    }

    public void setForm16(FileProps form16) {
        this.form16 = form16;
    }
}
