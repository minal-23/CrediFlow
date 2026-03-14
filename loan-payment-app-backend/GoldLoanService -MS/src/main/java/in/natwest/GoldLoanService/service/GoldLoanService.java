package in.natwest.GoldLoanService.service;

import in.natwest.GoldLoanService.model.FileInfo;
import in.natwest.GoldLoanService.model.FileProps;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface GoldLoanService {
    public void uploadFile(MultipartFile aadhaardCard,
                           MultipartFile panCard,
                           MultipartFile addressProof,
                           MultipartFile photo,
                           MultipartFile assayCertificate,
                           String tenure,
                           String emi,
                           String aadhaarNumber, String firstName,
                           String lastName,
                           String panNumber,
                           String email,
                           String loanAmount
    ) throws IOException;

    public List<FileProps> retrieveFilesFromMongoDB(String id);

    public FileInfo getFileInfo(String id);

}
