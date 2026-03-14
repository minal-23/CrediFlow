package com.natwest.PersonalLoanDocsService;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class PersonalLoanDocsServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(PersonalLoanDocsServiceApplication.class, args);
	}

}
