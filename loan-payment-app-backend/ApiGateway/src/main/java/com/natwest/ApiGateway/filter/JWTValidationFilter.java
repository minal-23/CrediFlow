package com.natwest.ApiGateway.filter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
public class JWTValidationFilter implements GatewayFilter {


    @Value("${jwt.secret}")
    private String secretKey;


    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {

//        Validate the JWT here
        System.out.println("Filter working");

        ServerHttpRequest request = exchange.getRequest();
        ServerHttpResponse response = exchange.getResponse();


        if(!request.getHeaders().containsKey("Authorization")){
            response.setStatusCode(HttpStatus.UNAUTHORIZED);
            System.out.println("Does not contain Authorization header");
            return response.setComplete();
        }


        String authHeader = request.getHeaders().getOrEmpty("Authorization").get(0);

        if(!authHeader.startsWith("Bearer ")){
            response.setStatusCode(HttpStatus.UNAUTHORIZED);
            System.out.println("Does not contain bearer");
            return response.setComplete();
        }


        String jwtToken = authHeader.substring(7);
        try {
            Claims claims = getClaims(jwtToken);
            String email = claims.getSubject();
            request.mutate().header("email",email);
        } catch (Exception e) {
            response.setStatusCode(HttpStatus.UNAUTHORIZED);
            System.out.println("Does not contain valid token");
            return response.setComplete();
        }
        return chain.filter(exchange);
    }
    private Claims getClaims(String jwtToken) throws Exception {
        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(jwtToken)
                .getBody();
    }
}

