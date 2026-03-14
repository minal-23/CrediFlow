package com.natwest.ApiGateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableDiscoveryClient
public class ApiGatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApiGatewayApplication.class, args);
	}
//	@Bean
//	public RouteLocator apiRoutes(RouteLocatorBuilder builder){
//		return builder.routes()
//				.route("goldloanService_route",route->route.path("/api/v1/loan/gold/docs/**").uri("lb://GoldLoan_Service"))
//				.route("homeloanService_route",route->route.path("/api/v1/loan/home/docs/**").uri("lb://HomeLoan_Service"))
//				.build();
//
//	}



}
