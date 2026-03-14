package in.natwest.user.service;

import in.natwest.user.exception.UserExistsException;
import in.natwest.user.model.User;
import in.natwest.user.model.userCredentials;
import in.natwest.user.repository.UserProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

//implementation of interface UserService
@Service
public class UserServiceImpl implements UserService {
//Dependency of repository or DAO
@Autowired
private UserProfileRepository repository;

@Autowired
private JWTGeneratorService jwtGeneratorService;
    @Override
    public User registeredUser(User newUser) throws UserExistsException {
       if(repository.existsByName(newUser.getName())) {
           throw new UserExistsException("Already Registered");
       }
       return repository.save(newUser);
    }

    @Override
    public Map<String,String> authenticateUser(userCredentials credentials) {
       Optional<User> userByName=repository.getUserByName(credentials.getName());
       if(userByName.isEmpty()){
           throw new RuntimeException("User Not Found");
       }
       User user=userByName.get();
       if(user.getPassword().equals(credentials.getPassword())){
           String token=jwtGeneratorService.generateToken(credentials.getName());
           return Map.of("token",token);
       }else{
           throw new RuntimeException("Credentials Mismatch");
       }
    }
}
