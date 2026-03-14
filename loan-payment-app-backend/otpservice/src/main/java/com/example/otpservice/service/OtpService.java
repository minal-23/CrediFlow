package com.example.otpservice.service;

public interface OtpService {
    public String generateOtp();

    public void sendOtp(String phoneNumber);

    public boolean authenticateOtp(String phoneNumber, String otp);


}
