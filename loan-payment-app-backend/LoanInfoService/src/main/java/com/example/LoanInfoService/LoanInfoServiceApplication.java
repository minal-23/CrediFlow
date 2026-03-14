package com.example.LoanInfoService;

import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
@EnableRabbit
public class LoanInfoServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(LoanInfoServiceApplication.class, args);
	}

}
