package in.natwest.GoldLoanService.service;

import in.natwest.GoldLoanService.model.FileInfo;
import in.natwest.GoldLoanService.model.FileProps;
import in.natwest.GoldLoanService.model.LoanInfo;
import in.natwest.GoldLoanService.repository.GoldLoanRepository;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class GoldLoanServiceImpl implements GoldLoanService {
    @Autowired
    private GoldLoanRepository repository;
    @Autowired
    private RabbitTemplate rabbitTemplate;


    @Override
    public void uploadFile(MultipartFile aadhaarCard,
                           MultipartFile panCard,
                           MultipartFile addressProof,
                           MultipartFile photo,
                           MultipartFile assayCertificate,
                           String tenure,
                           String emi,
                           String aadhaarNumber,
                           String firstName,
                           String lastName,
                           String panNumber,
                           String email,
                           String loanAmount
                           ) throws IOException {
        FileInfo file = new FileInfo();
        String loanId = UUID.randomUUID().toString();
        file.setLoanType("gold");
        file.setId(loanId);
        file.setAadhaarNumber(aadhaarNumber);
        file.setTenure(tenure);
        file.setEmi(emi);
        file.setFirstName(firstName);
        file.setLastName(lastName);
        file.setPanNumber(panNumber);

        saveFile(aadhaarCard, file.getAadhaarCard());
        saveFile(panCard, file.getPanCard());
        saveFile(photo, file.getPhoto());
        saveFile(aadhaarCard, file.getAddressProof());
        saveFile(assayCertificate, file.getAssayCertificate());
        saveFile(addressProof, file.getAddressProof());
        String date = LocalDate.now().toString();

        Object loanInfo = new LoanInfo(loanId, "gold", "pending", emi, tenure, tenure, loanAmount, "0", loanAmount, "9.50", "0", "0", date, email, aadhaarNumber);
        rabbitTemplate.convertAndSend("rabbitmq_exchangeKey", "rabbitmq_routeKey", loanInfo);

        repository.save(file);

    }
    public void saveFile(MultipartFile file, FileProps fileProps) throws IOException {
        fileProps.setFileName(file.getOriginalFilename());
        fileProps.setFiledata(file.getBytes());
        fileProps.setContentType(file.getContentType());
    }
    @Override
    public List<FileProps> retrieveFilesFromMongoDB(String id) {
        Optional<FileInfo> fileInfo = repository.findById(id);
        List<FileProps> allDocs = new ArrayList<>();
        allDocs.add(fileInfo.get().getAadhaarCard());
        allDocs.add(fileInfo.get().getPanCard());
        allDocs.add(fileInfo.get().getAddressProof());
        allDocs.add(fileInfo.get().getPhoto());
        allDocs.add(fileInfo.get().getAssayCertificate());
        return allDocs;
    }
    @Override
    public FileInfo getFileInfo(String id) {
        return repository.findById(id).get();
    }


}

