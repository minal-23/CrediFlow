package com.natwest.PersonalLoanDocsService.service;

import com.natwest.PersonalLoanDocsService.model.FileInfo;
import com.natwest.PersonalLoanDocsService.model.FileProps;
import com.natwest.PersonalLoanDocsService.model.LoanInfo;
import com.natwest.PersonalLoanDocsService.repository.PersonalLoanDocRepository;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PersonalLoanDocServiceImpl implements PersonalLoanDocService {

    @Autowired
    private PersonalLoanDocRepository personalLoanDocRepository;

    @Autowired
    private RabbitTemplate rabbitTemplate;


    @Override
    public void uploadFile(MultipartFile aadhaardCard,
                           MultipartFile panCard,
                           MultipartFile signatureProof,
                           MultipartFile addressProof,
                           MultipartFile bankStatements,
                           MultipartFile salarySlips,
                           String tenure,
                           String emi,
                           String aadhaarNumber, String firstName, String lastName, String panNumber, String loanAmount, String email) throws IOException {
        FileInfo file = new FileInfo();
        String loanId = UUID.randomUUID().toString();
        file.setId(loanId);
        file.setLoanType("personal");
        file.setAadhaarNumber(aadhaarNumber);
        file.setTenure(tenure);
        file.setEmi(emi);

        saveFile(aadhaardCard, file.getAadhaarCard());
        saveFile(panCard, file.getPanCard());
        saveFile(signatureProof, file.getSignatureProof());
        saveFile(addressProof, file.getAddressProof());
        saveFile(bankStatements, file.getBankStatements());
        saveFile(salarySlips, file.getSalarySlips());

        String date = LocalDate.now().toString();

        Object loanInfo = new LoanInfo(loanId, "personal", "pending", emi, tenure, tenure, loanAmount, "0", loanAmount, "10.49", "0", "0", date, email, aadhaarNumber);

        rabbitTemplate.convertAndSend("rabbitmq_exchangeKey", "rabbitmq_routeKey", loanInfo);

        personalLoanDocRepository.save(file);

    }

    public void saveFile(MultipartFile file, FileProps fileProps) throws IOException {
        fileProps.setFileName(file.getOriginalFilename());
        fileProps.setData(file.getBytes());
        fileProps.setContentType(file.getContentType());
    }

    @Override
    public List<FileProps> retrieveFilesFromMongoDB(String id) {
        Optional<FileInfo> fileInfo = personalLoanDocRepository.findById(id);
        List<FileProps> allDocs = new ArrayList<>();
        allDocs.add(fileInfo.get().getAadhaarCard());
        allDocs.add(fileInfo.get().getPanCard());
        allDocs.add(fileInfo.get().getSignatureProof());
        allDocs.add(fileInfo.get().getSalarySlips());
        allDocs.add(fileInfo.get().getBankStatements());
        allDocs.add(fileInfo.get().getAddressProof());
        return allDocs;
    }

    @Override
    public FileInfo getFileInfo(String id) {
        return personalLoanDocRepository.findById(id).get();
    }
}
