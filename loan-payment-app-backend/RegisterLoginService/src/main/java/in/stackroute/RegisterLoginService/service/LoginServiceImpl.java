package in.stackroute.RegisterLoginService.service;

import com.netflix.discovery.converters.Auto;
import in.stackroute.RegisterLoginService.model.Admin;
import in.stackroute.RegisterLoginService.model.User;
import in.stackroute.RegisterLoginService.model.UserCredentials;
import in.stackroute.RegisterLoginService.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import in.stackroute.RegisterLoginService.repository.UserRepository;

import java.util.Map;
import java.util.Optional;

@Service
public class LoginServiceImpl implements LoginService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JWTGeneratorService jwtGeneratorService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private AdminRepository adminRepository;

    @Override
    public Map<String,String> authenticateUser(UserCredentials userCredentials) {
        Optional<User> userByEmail = userRepository.findByEmail(userCredentials.getEmail());
        if(userByEmail.isEmpty()){
            throw new RuntimeException("User not found");
        }

        User user = userByEmail.get();

        if(passwordEncoder.matches(userCredentials.getPassword(), user.getPassword())){
            String token = jwtGeneratorService.generateToken(userCredentials.getEmail());
            return Map.of("token",token);
        }
        else{
            throw new RuntimeException("Incorrect password");
        }
    }

    @Override
    public boolean authenticateAdmin(Admin admin) {
        Optional<Admin> adminOptional = adminRepository.findByUsernameAndPassword(admin.getUsername(), admin.getPassword());
        if(adminOptional.isEmpty()){
            return false;
        }
        return true;
    }

    @Override
    public Map<String, String> authenticateUserByPin(UserCredentials userCredentials) {
        Optional<User> userByEmail = userRepository.findByEmail(userCredentials.getEmail());
        if(userByEmail.isEmpty()){
            throw new RuntimeException("User not found");
        }

        User user = userByEmail.get();

        if(user.getPin().equals(userCredentials.getPin())){
            String token = jwtGeneratorService.generateToken(userCredentials.getEmail());
            return Map.of("token",token);
        }
        else{
            throw new RuntimeException("Incorrect pin");
        }


    }
}
