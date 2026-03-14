package in.natwest.user.controller;

import in.natwest.user.exception.UserExistsException;
import in.natwest.user.model.User;
import in.natwest.user.model.userCredentials;
import in.natwest.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("api/v4/users")
public class UserProfileController {
    @Autowired
    private UserService service;
    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User newUser) throws UserExistsException {
        return new ResponseEntity<>(service.registeredUser(newUser), HttpStatus.CREATED);

    }
    @PostMapping("/login")

    public ResponseEntity<?> loginUser(@RequestBody userCredentials credentials){
        Map<String,String> token=service.authenticateUser(credentials);
//        System.out.println(valid);
        return new ResponseEntity<>(token,HttpStatus.OK);
    }
}
