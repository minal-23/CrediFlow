package in.stackroute.RegisterLoginService.controller;

import in.stackroute.RegisterLoginService.model.Admin;
import in.stackroute.RegisterLoginService.model.User;
import in.stackroute.RegisterLoginService.model.UserCredentials;
import in.stackroute.RegisterLoginService.service.AdminService;
import in.stackroute.RegisterLoginService.service.LoginService;
import in.stackroute.RegisterLoginService.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;
    private final LoginService loginService;

    @Autowired
    private AdminService adminService;

    @Autowired
    public UserController(UserService userService, LoginService loginService) {
        this.userService = userService;
        this.loginService = loginService;
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        System.out.println("fetch statement");
        List<User> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        Optional<User> user = userService.getUserById(id);
        return user.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/register")
    public ResponseEntity<Boolean> registerUser(@RequestBody User user) {
        boolean userExists = userService.isUserExists(user.getEmail(), user.getPassword());
        if (userExists) {
            return new ResponseEntity<>(false,HttpStatus.OK); // User already exists
        }

        User newUser = userService.createUser(user);
        if (newUser != null) {

            return ResponseEntity.ok(true); // Registration successful
        }
        return ResponseEntity.ok(false); // Registration failed
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody UserCredentials user) {
        return new ResponseEntity<>(loginService.authenticateUser(user), HttpStatus.OK);
    }

    @PostMapping("/login/pin")
    public ResponseEntity<?> loginUserByPin(@RequestBody UserCredentials user){
        return new ResponseEntity<>(loginService.authenticateUserByPin(user), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
        User updatedUser = userService.updateUser(id, user);
        return updatedUser != null
                ? new ResponseEntity<>(updatedUser, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/admin/register")
    public ResponseEntity<Admin> registerAdmin(@RequestBody Admin admin){
        return new ResponseEntity<>(adminService.registerAdmin(admin),HttpStatus.OK);
    }

    @PostMapping("/admin/login")
    public ResponseEntity<Boolean> loginAdmin(@RequestBody Admin admin){
        return new ResponseEntity<>(loginService.authenticateAdmin(admin),HttpStatus.OK);
    }
}
