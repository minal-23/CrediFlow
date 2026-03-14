package in.stackroute.RegisterLoginService.service;

import in.stackroute.RegisterLoginService.model.Admin;
import in.stackroute.RegisterLoginService.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public Admin registerAdmin(Admin admin){
        admin.setId(UUID.randomUUID().toString());
        return adminRepository.save(admin);
    }
}
