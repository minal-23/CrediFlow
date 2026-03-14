package com.natwest.HomeLoanDocsService;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class HomeLoanDocsServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(HomeLoanDocsServiceApplication.class, args);
	}

}
