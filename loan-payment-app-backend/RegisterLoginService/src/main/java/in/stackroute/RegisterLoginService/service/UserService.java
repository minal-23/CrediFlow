package in.stackroute.RegisterLoginService.service;

import in.stackroute.RegisterLoginService.model.User;
import in.stackroute.RegisterLoginService.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public User createUser(User user) {
        // Hash the password before saving it to the database
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        return userRepository.save(user);
    }

    public User updateUser(Long id, User user) {
        // Find the user by ID
        Optional<User> existingUserOptional = userRepository.findById(id);
        if (existingUserOptional.isPresent()) {
            User existingUser = existingUserOptional.get();
            // Update the fields you want to allow to be updated
            existingUser.setFirstName(user.getFirstName());
            existingUser.setMiddleName(user.getMiddleName());
            existingUser.setLastName(user.getLastName());
            existingUser.setMobileNumber(user.getMobileNumber());
            existingUser.setDob(user.getDob());
            existingUser.setAddressLine1(user.getAddressLine1());
            existingUser.setAddressLine2(user.getAddressLine2());
            existingUser.setAddressLine3(user.getAddressLine3());
            existingUser.setState(user.getState());
            existingUser.setCity(user.getCity());
            existingUser.setPostalCode(user.getPostalCode());
            // Hash the updated password if provided
            if (user.getPassword() != null) {
                existingUser.setPassword(passwordEncoder.encode(user.getPassword()));
            }
            // Save the updated user
            return userRepository.save(existingUser);
        }
        return null; // Handle not found case
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public boolean authenticate(String email, String password) {
        return false;
    }

    public boolean isUserExists(String email, String password) {
        return userRepository.existsByEmail(email);
    }
}
