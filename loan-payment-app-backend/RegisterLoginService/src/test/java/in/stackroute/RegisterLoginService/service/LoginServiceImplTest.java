package in.stackroute.RegisterLoginService.service;

import in.stackroute.RegisterLoginService.model.User;
import in.stackroute.RegisterLoginService.model.UserCredentials;
import in.stackroute.RegisterLoginService.repository.AdminRepository;
import in.stackroute.RegisterLoginService.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;

public class LoginServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private AdminRepository adminRepository;

    @Mock
    private JWTGeneratorService jwtGeneratorService;

    @Mock
    private BCryptPasswordEncoder passwordEncoder;

    private LoginService loginService;

    @BeforeEach
    public void setUp() {
        userRepository = Mockito.mock(UserRepository.class);
        adminRepository = Mockito.mock(AdminRepository.class);
        jwtGeneratorService = Mockito.mock(JWTGeneratorService.class);
        passwordEncoder = Mockito.mock(BCryptPasswordEncoder.class);
        loginService = new LoginServiceImpl();
    }


    @Test
    public void testAuthenticateUser_IncorrectPassword() {
        UserCredentials userCredentials = new UserCredentials("test@example.com", "incorrect_password");
        User user = new User();
        user.setEmail("test@example.com");
        user.setPassword(passwordEncoder.encode("password"));

        Mockito.when(userRepository.findByEmail(userCredentials.getEmail())).thenReturn(Optional.of(user));
        Mockito.when(passwordEncoder.matches(userCredentials.getPassword(), user.getPassword())).thenReturn(false);

        assertThrows(RuntimeException.class, () -> loginService.authenticateUser(userCredentials));
    }

    @Test
    public void testAuthenticateUser_UserNotFound() {
        UserCredentials userCredentials = new UserCredentials("nonexistent@example.com", "password");

        Mockito.when(userRepository.findByEmail(userCredentials.getEmail())).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> loginService.authenticateUser(userCredentials));
    }


    @Test
    public void testAuthenticateUserByPin_IncorrectPin() {
        UserCredentials userCredentials = new UserCredentials("test@example.com", "5678");
        User user = new User();
        user.setEmail("test@example.com");
        user.setPin("1234");

        Mockito.when(userRepository.findByEmail(userCredentials.getEmail())).thenReturn(Optional.of(user));

        assertThrows(RuntimeException.class, () -> loginService.authenticateUserByPin(userCredentials));
    }

    @Test
    public void testAuthenticateUserByPin_UserNotFound() {
        UserCredentials userCredentials = new UserCredentials("nonexistent@example.com", "1234");

        Mockito.when(userRepository.findByEmail(userCredentials.getEmail())).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> loginService.authenticateUserByPin(userCredentials));
    }
}
