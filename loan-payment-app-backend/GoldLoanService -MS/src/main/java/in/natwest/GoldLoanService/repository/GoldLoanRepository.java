package in.natwest.GoldLoanService.repository;

import in.natwest.GoldLoanService.model.FileInfo;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface GoldLoanRepository extends MongoRepository<FileInfo,String> {
}
