package com.natwest.HomeLoanDocsService.service;

import com.natwest.HomeLoanDocsService.model.FileInfo;
import com.natwest.HomeLoanDocsService.model.FileProps;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface HomeLoanDocService {
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
                           String aadhaarNumber,
                           String firstName,
                           String lastName,
                           String panNumber,
                           String loanAmount
    ) throws IOException;

    public List<FileProps> retrieveFilesFromMongoDB(String id);

    public FileInfo getFileInfo(String id);
}
