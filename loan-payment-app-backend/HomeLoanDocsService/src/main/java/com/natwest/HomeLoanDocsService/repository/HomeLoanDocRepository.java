package com.natwest.HomeLoanDocsService.repository;

import com.natwest.HomeLoanDocsService.model.FileInfo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HomeLoanDocRepository extends MongoRepository<FileInfo,String> {
}
