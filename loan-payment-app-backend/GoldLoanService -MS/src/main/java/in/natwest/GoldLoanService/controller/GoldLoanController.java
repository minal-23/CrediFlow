package in.natwest.GoldLoanService.controller;

import in.natwest.GoldLoanService.model.FileInfo;
import in.natwest.GoldLoanService.model.FileProps;
import in.natwest.GoldLoanService.service.GoldLoanService;
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
@RequestMapping("/api/v2/loan/gold/docs")
public class GoldLoanController {
    @Autowired
    private GoldLoanService service;
    @PostMapping("/upload")
    public String uploadFile(
                            @RequestParam("aadhaarCard") MultipartFile aadhaarCard,
                            @RequestParam("panCard") MultipartFile panCard,
                            @RequestParam("addressProof") MultipartFile addressProof,
                            @RequestParam("assayCertificate") MultipartFile assayCertificate,
                            @RequestParam("photo") MultipartFile photo,
                             @RequestParam("tenure") String tenure,
                             @RequestParam("emi") String emi,
                             @RequestParam("aadhaarNumber") String aadhaarNumber,
                             @RequestParam("firstName") String firstName,
                             @RequestParam("lastName") String lastName,
                             @RequestParam("panNumber") String panNumber,
                            @RequestParam("email") String email,
                            @RequestParam("loanAmount") String loanAmount
    )
            throws IOException {
        service.uploadFile(aadhaarCard, panCard, addressProof,assayCertificate,photo,tenure, emi, aadhaarNumber,
                firstName,lastName,panNumber,email,loanAmount);
        return "Success";
    }

    @GetMapping("/getFile/{id}")
    public ResponseEntity<InputStreamResource> getFileById(@PathVariable String id){
        try {
            List<FileProps> files = service.retrieveFilesFromMongoDB(id); // Implement this method to get files from MongoDB
            FileInfo fileInfo = service.getFileInfo(id);
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ZipOutputStream zipOut = new ZipOutputStream(baos);

            for (FileProps file : files) {
                ZipEntry zipEntry = new ZipEntry(file.getFileName());
                zipOut.putNextEntry(zipEntry);
                zipOut.write(file.getFiledata());
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

