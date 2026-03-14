package com.natwest.PersonalLoanDocsService.controller;

import com.natwest.PersonalLoanDocsService.model.FileInfo;
import com.natwest.PersonalLoanDocsService.model.FileProps;
import com.natwest.PersonalLoanDocsService.service.PersonalLoanDocService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@RestController
@RequestMapping("/api/v1/loan/personal/docs")
public class PersonaLoanDocController {

    @Autowired
    private PersonalLoanDocService personalLoanDocService;

    @PostMapping("/upload")
    public String uploadFile(@RequestParam("aadhaarCard") MultipartFile aadhaardCard,
                           @RequestParam("panCard") MultipartFile panCard,
                           @RequestParam("signatureProof") MultipartFile signatureProof,
                           @RequestParam("addressProof") MultipartFile addressProof,
                           @RequestParam("bankStatements") MultipartFile bankStatements,
                           @RequestParam("salarySlips") MultipartFile salarySlips,
                           @RequestParam("tenure") String tenure,
                           @RequestParam("emi") String emi,
                           @RequestParam("aadhaarNumber") String aadhaarNumber,
                           @RequestParam("firstName") String firstName,
                           @RequestParam("lastName") String lastName,
                           @RequestParam("panNumber") String panNumber,
                           @RequestParam("loanAmount") String loanAmount,
                           @RequestParam("email") String email)
            throws IOException {
        personalLoanDocService.uploadFile(aadhaardCard, panCard, signatureProof, addressProof, bankStatements, salarySlips, tenure, emi, aadhaarNumber, firstName, lastName, panNumber,loanAmount,email);
        return "Success";
    }

    @GetMapping("/getFile/{id}")
    public ResponseEntity<InputStreamResource> getFileById(@PathVariable String id){
        try {
            List<FileProps> files = personalLoanDocService.retrieveFilesFromMongoDB(id); // Implement this method to get files from MongoDB
            FileInfo fileInfo = personalLoanDocService.getFileInfo(id);
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ZipOutputStream zipOut = new ZipOutputStream(baos);

            for (FileProps file : files) {
                ZipEntry zipEntry = new ZipEntry(file.getFileName());
                zipOut.putNextEntry(zipEntry);
                zipOut.write(file.getData());
                zipOut.closeEntry();
            }

            zipOut.close();
            baos.close();

            String filename = fileInfo.getAadhaarNumber()+'_'+fileInfo.getLoanType()+'_'+id;

            byte[] zipBytes = baos.toByteArray();

            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename="+filename+".zip");

            return ResponseEntity
                    .ok()
                    .headers(headers)
                    .contentType(MediaType.parseMediaType("application/zip"))
                    .body(new InputStreamResource(new ByteArrayInputStream(zipBytes)));
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }

}
