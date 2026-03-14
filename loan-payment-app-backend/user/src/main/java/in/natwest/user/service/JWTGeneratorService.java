package in.natwest.user.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JWTGeneratorService {
    @Value("${jwt.secret.key}")
    private String secretKey;
    public static final long VALIDITY_PERIOD=60*60*1000;//SETTING THE EXPIRING TIME TO BE 1 HR
    public String generateToken(String name){//this function will generate JWT
        return Jwts.builder()
                .setExpiration(new Date(System.currentTimeMillis()+VALIDITY_PERIOD))
                .setIssuedAt(new Date())
                .setSubject(name)
                .setIssuer("in.natwest")
                .signWith(SignatureAlgorithm.HS512,secretKey)
                .compact();
    }

}
