package com.example.otpservice.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "otp_table")
public class OtpModel {

    @Id
    private String id;
    private String phoneNumber;
    private String otp;

    public OtpModel() {
    }

    public OtpModel(String id, String phoneNumber, String otp) {
        this.id = id;
        this.phoneNumber = phoneNumber;
        this.otp = otp;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getOtp() {
        return otp;
    }

    public void setOtp(String otp) {
        this.otp = otp;
    }
}

