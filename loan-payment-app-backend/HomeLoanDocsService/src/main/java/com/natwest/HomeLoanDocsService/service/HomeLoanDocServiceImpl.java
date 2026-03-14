package com.natwest.HomeLoanDocsService.service;

import com.natwest.HomeLoanDocsService.model.FileInfo;
import com.natwest.HomeLoanDocsService.model.FileProps;
import com.natwest.HomeLoanDocsService.model.LoanInfo;
import com.natwest.HomeLoanDocsService.repository.HomeLoanDocRepository;
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
public class HomeLoanDocServiceImpl implements HomeLoanDocService {

    @Autowired
    private HomeLoanDocRepository homeLoanDocRepository;

    @Autowired
    private RabbitTemplate rabbitTemplate;


    @Override
    public void uploadFile(MultipartFile aadhaarCard,
                           MultipartFile panCard,
                           MultipartFile signatureProof,
                           MultipartFile addressProof,
                           MultipartFile bankStatements,
                           MultipartFile paymentReceipts,
                           MultipartFile occupancyCertificate,
                           MultipartFile approvedPlanCopy,
                           MultipartFile form16,
                           String tenure,
                           String emi,
                           String aadhaarNumber, String firstName, String lastName, String panNumber, String loanAmount) throws IOException {
        FileInfo file = new FileInfo();
        String loanId = UUID.randomUUID().toString();
        file.setId(loanId);
        file.setLoanType("home");
        file.setAadhaarNumber(aadhaarNumber);
        file.setTenure(tenure);
        file.setEmi(emi);

        saveFile(aadhaarCard, file.getAadhaarCard());
        saveFile(panCard, file.getPanCard());
        saveFile(signatureProof, file.getSignatureProof());
        saveFile(addressProof, file.getAddressProof());
        saveFile(bankStatements, file.getBankStatements());
        saveFile(paymentReceipts, file.getPaymentReceipts());
        saveFile(occupancyCertificate, file.getOccupancyCertificate());
        saveFile(approvedPlanCopy, file.getApprovedPlanCopy());
        saveFile(form16, file.getForm16());

        String date = LocalDate.now().toString();

        Object loanInfo = new LoanInfo(loanId, "home", "pending", emi, tenure, tenure, loanAmount, "0", "10000", "10.49", "0", "0", date, "abc@gmail.com", aadhaarNumber);

        rabbitTemplate.convertAndSend("rabbitmq_exchangeKey", "rabbitmq_routeKey", loanInfo);

        homeLoanDocRepository.save(file);

    }

    public void saveFile(MultipartFile file, FileProps fileProps) throws IOException {
        fileProps.setFileName(file.getOriginalFilename());
        fileProps.setData(file.getBytes());
        fileProps.setContentType(file.getContentType());
    }

    @Override
    public List<FileProps> retrieveFilesFromMongoDB(String id) {
        Optional<FileInfo> fileInfo = homeLoanDocRepository.findById(id);
        List<FileProps> allDocs = new ArrayList<>();
        allDocs.add(fileInfo.get().getAadhaarCard());
        allDocs.add(fileInfo.get().getPanCard());
        allDocs.add(fileInfo.get().getSignatureProof());
        allDocs.add(fileInfo.get().getPaymentReceipts());
        allDocs.add(fileInfo.get().getBankStatements());
        allDocs.add(fileInfo.get().getAddressProof());
        allDocs.add(fileInfo.get().getOccupancyCertificate());
        allDocs.add(fileInfo.get().getApprovedPlanCopy());
        allDocs.add(fileInfo.get().getForm16());
        return allDocs;
    }

    @Override
    public FileInfo getFileInfo(String id) {
        return homeLoanDocRepository.findById(id).get();
    }
}
