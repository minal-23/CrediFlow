package com.example.otpservice.repository;

import com.example.otpservice.model.OtpModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OtpRepository extends JpaRepository<OtpModel,String> {

    public Optional<OtpModel> findByphoneNumber(String phoneNumber);

}
