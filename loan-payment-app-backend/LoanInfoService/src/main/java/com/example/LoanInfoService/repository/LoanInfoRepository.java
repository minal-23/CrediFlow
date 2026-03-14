package com.example.LoanInfoService.repository;

import com.example.LoanInfoService.model.LoanInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LoanInfoRepository extends JpaRepository<LoanInfo, String> {
   public List<LoanInfo> findByEmailid(String emailid);
   public LoanInfo findByEmailidAndLoanId(String emailid, String loanId);
   public LoanInfo getByLoanId(String loanId);
}
