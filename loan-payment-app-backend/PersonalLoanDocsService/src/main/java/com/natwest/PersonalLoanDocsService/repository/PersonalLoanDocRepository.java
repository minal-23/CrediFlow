package com.natwest.PersonalLoanDocsService.repository;

import com.natwest.PersonalLoanDocsService.model.FileInfo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonalLoanDocRepository extends MongoRepository<FileInfo,String> {
}
