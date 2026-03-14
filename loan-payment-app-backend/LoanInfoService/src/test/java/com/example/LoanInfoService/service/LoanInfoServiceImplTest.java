package com.example.LoanInfoService.service;

import com.example.LoanInfoService.model.LoanInfo;
import com.example.LoanInfoService.repository.LoanInfoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

public class LoanInfoServiceImplTest {

    @InjectMocks
    private LoanInfoServiceImpl loanInfoService;

    @Mock
    private LoanInfoRepository loanInfoRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testReceivedMessage() {
        LoanInfo loanInfo = new LoanInfo();
        when(loanInfoRepository.save(loanInfo)).thenReturn(loanInfo);
        loanInfoService.receivedMessage(loanInfo);
        verify(loanInfoRepository, times(1)).save(loanInfo);
    }

    @Test
    public void testGetAllLoans() {
        String emailid = "example@example.com";
        List<LoanInfo> loanInfoList = new ArrayList<>();
        when(loanInfoRepository.findByEmailid(emailid)).thenReturn(loanInfoList);
        List<LoanInfo> result = loanInfoService.getAllLoans(emailid);
        verify(loanInfoRepository, times(1)).findByEmailid(emailid);
        assertNotNull(result);
    }

    @Test
    public void testGetLoan() {
        String emailid = "example@example.com";
        String loanId = "12345";
        LoanInfo loanInfo = new LoanInfo();
        when(loanInfoRepository.findByEmailidAndLoanId(emailid, loanId)).thenReturn(loanInfo);
        LoanInfo result = loanInfoService.getLoan(emailid, loanId);
        verify(loanInfoRepository, times(1)).findByEmailidAndLoanId(emailid, loanId);
        assertNotNull(result);
    }


    @Test
    public void testApproveLoanById() {
        String loanId = "12345";
        LoanInfo existingLoan = new LoanInfo();
        when(loanInfoRepository.getByLoanId(loanId)).thenReturn(existingLoan);
        when(loanInfoRepository.save(existingLoan)).thenReturn(existingLoan);
        String result = loanInfoService.approveLoanById(loanId);
        verify(loanInfoRepository, times(1)).getByLoanId(loanId);
        verify(loanInfoRepository, times(1)).save(existingLoan);
        assertEquals("Approved", result);
    }

    @Test
    public void testRejectLoanById() {
        String loanId = "12345";
        LoanInfo existingLoan = new LoanInfo();
        when(loanInfoRepository.getByLoanId(loanId)).thenReturn(existingLoan);
        when(loanInfoRepository.save(existingLoan)).thenReturn(existingLoan);
        String result = loanInfoService.rejectLoanById(loanId);
        verify(loanInfoRepository, times(1)).getByLoanId(loanId);
        verify(loanInfoRepository, times(1)).save(existingLoan);
        assertEquals("Rejected", result);
    }
}

