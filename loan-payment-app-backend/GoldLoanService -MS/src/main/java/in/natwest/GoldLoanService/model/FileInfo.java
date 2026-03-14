package in.natwest.GoldLoanService.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "GoldLoanDocs")
public class FileInfo {
    @Id
    private String id;
    private String firstName;
    private String  lastName;
    private String panNumber;
    private String loanType;
    private String aadhaarNumber;
    private String tenure;
    private String emi;
    private FileProps aadhaarCard = new FileProps();
    private FileProps panCard = new FileProps();
    private FileProps addressProof = new FileProps();
    private FileProps photo = new FileProps();
    private FileProps assayCertificate = new FileProps();

    public FileProps getPhoto() {
        return photo;
    }

    public void setPhoto(FileProps photo) {
        this.photo = photo;
    }

    public FileProps getAssayCertificate() {
        return assayCertificate;
    }

    public void setAssayCertificate(FileProps assayCertificate) {
        this.assayCertificate = assayCertificate;
    }

    public FileInfo(String id, String firstName, String lastName, String panNumber, String loanType, String aadhaarNumber, String tenure, String emi, FileProps aadhaarCard, FileProps panCard, FileProps addressProof, FileProps photo, FileProps assayCertificate) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.panNumber = panNumber;
        this.loanType = loanType;
        this.aadhaarNumber = aadhaarNumber;
        this.tenure = tenure;
        this.emi = emi;
        this.aadhaarCard = aadhaarCard;
        this.panCard = panCard;
        this.addressProof = addressProof;
        this.photo = photo;
        this.assayCertificate = assayCertificate;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }


    public FileInfo(String id, String loanType, String aadhaarNumber, String tenure, String emi, FileProps aadhaarCard, FileProps panCard, FileProps addressProof, String firstName, String lastName, String panNumber) {
        this.id = id;
        this.loanType = loanType;
        this.aadhaarNumber = aadhaarNumber;
        this.tenure = tenure;
        this.emi = emi;
        this.aadhaarCard = aadhaarCard;
        this.panCard = panCard;
        this.addressProof = addressProof;
        this.firstName = firstName;
        this.lastName = lastName;
        this.panNumber = panNumber;
    }

    public String getPanNumber() {
        return panNumber;
    }

    public void setPanNumber(String panNumber) {
        this.panNumber = panNumber;
    }

    public FileInfo() {
    }

    public FileInfo(String id, String loanType, String aadhaarNumber, String tenure, String emi, FileProps aadhaarCard, FileProps panCard, FileProps signatureProof, FileProps addressProof, FileProps bankStatements, FileProps salarySlips) {
        this.id = id;
        this.loanType = loanType;
        this.aadhaarNumber = aadhaarNumber;
        this.tenure = tenure;
        this.emi = emi;
        this.aadhaarCard = aadhaarCard;
        this.panCard = panCard;
        this.addressProof = addressProof;
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

    public FileProps getAddressProof() {
        return addressProof;
    }

    public void setAddressProof(FileProps addressProof) {
        this.addressProof = addressProof;
    }


}