package in.natwest.user.service;

import in.natwest.user.exception.UserExistsException;
import in.natwest.user.model.User;
import in.natwest.user.model.userCredentials;

import java.util.Map;

//interface of service
public interface UserService {
    User registeredUser(User newUser) throws UserExistsException;
    Map<String,String> authenticateUser(userCredentials credentials);

}
