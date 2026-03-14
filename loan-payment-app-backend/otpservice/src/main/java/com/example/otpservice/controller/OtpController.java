package com.example.otpservice.controller;

import com.example.otpservice.service.OtpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/otp")
public class OtpController {

    @Autowired
    private OtpService otpService;

    @GetMapping("/test")
    public String test(){
        return "OTP Service works";
    }

    @PostMapping("/sendotp/{phoneNumber}")
    public void sendOtp(@PathVariable String phoneNumber){
        otpService.sendOtp(phoneNumber);
    }

    @PostMapping("/auth")
    public String authOtp(@RequestHeader String phoneNumber, @RequestHeader String otp){
        if(otpService.authenticateOtp(phoneNumber, otp)){
            return "Authenticated";
        }
        else{
            return "Wrong OTP!";
        }
    }

}
