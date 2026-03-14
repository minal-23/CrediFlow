package com.example.otpservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class OtpserviceApplication {

	public static void main(String[] args) {
		SpringApplication.run(OtpserviceApplication.class, args);
	}

}
