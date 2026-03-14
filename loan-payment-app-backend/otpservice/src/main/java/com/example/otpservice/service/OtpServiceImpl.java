package com.example.otpservice.service;


import com.example.otpservice.model.OtpModel;
import com.example.otpservice.repository.OtpRepository;
import com.vonage.client.VonageClient;
import com.vonage.client.sms.SmsSubmissionResponse;
import com.vonage.client.sms.messages.TextMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Random;
import java.util.UUID;

@Service
public class OtpServiceImpl implements OtpService{

    @Autowired
    private OtpRepository otpRepository;

    VonageClient client = VonageClient.builder().apiKey("6c073f6e").apiSecret("eyyvM4wrWy09OfQ9").build();

    @Override
    public String generateOtp() {
        Random random = new Random();
        int otp = 1000 + random.nextInt(9000);
        return String.valueOf(otp);
    }

    @Override
    public void sendOtp(String phoneNumber){

        String otp = generateOtp();

        TextMessage message = new TextMessage("Vonage APIs",
                phoneNumber,
                "Your OTP is: " + otp
        );

        SmsSubmissionResponse response = client.getSmsClient().submitMessage(message);

        if(otpRepository.findByphoneNumber(phoneNumber).isPresent()){
            OtpModel otpModel = new OtpModel(otpRepository.findByphoneNumber(phoneNumber).get().getId(),phoneNumber,otp);
            otpRepository.save(otpModel);
        }
        else{
            otpRepository.save(new OtpModel(UUID.randomUUID().toString(),phoneNumber, otp));
        }
    }

    @Override
    public boolean authenticateOtp(String phoneNumber, String otp) {
        Optional<OtpModel> otpModel = otpRepository.findByphoneNumber(phoneNumber);
        return otpModel.get().getOtp().equals(otp);
    }
}
