package in.stackroute.RegisterLoginService.service;

import in.stackroute.RegisterLoginService.model.Admin;
import in.stackroute.RegisterLoginService.model.UserCredentials;

import java.util.Map;

public interface LoginService {
    Map<String,String> authenticateUser(UserCredentials userCredentials);

    Map<String, String> authenticateUserByPin(UserCredentials userCredentials);

    public boolean authenticateAdmin(Admin admin);
}
