package com.example.LoanInfoService.service;

import com.example.LoanInfoService.model.LoanInfo;
import com.example.LoanInfoService.repository.LoanInfoRepository;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class LoanInfoServiceImpl implements LoanInfoService{

    @Autowired
    private LoanInfoRepository loanInfoRepository;
    @Override
    @RabbitListener(queues = "rabbitmq_queueLoan")
    public void receivedMessage(LoanInfo loanInfo) {
        //we receive the data from personal loan registry
        System.out.println(loanInfo);
        loanInfoRepository.save(loanInfo);
    }

    @Override
    public List<LoanInfo> getAllLoans(String emailid){
        return loanInfoRepository.findByEmailid(emailid);
    }

    @Override
    public LoanInfo getLoan(String emailid, String loanId){
        return loanInfoRepository.findByEmailidAndLoanId(emailid,loanId);
    }

    @Override
    public LoanInfo updateLoan(String emailid, String loanId, String amountPaid){
        LoanInfo cLoan=loanInfoRepository.findByEmailidAndLoanId(emailid,loanId);
        float amount=Float.parseFloat(amountPaid);
        float pLeft=Float.parseFloat(cLoan.getPrincipalLeft());
        int tLeft=Integer.parseInt(cLoan.getLoanTenurePending());
        int paidEmi=Integer.parseInt(cLoan.getPaidEmiNumber());
        float tAmount=Float.parseFloat(cLoan.getTotalAmountPaid());
        float emi=Float.parseFloat(cLoan.getLoanEmi());
        float roi=Float.parseFloat(cLoan.getRateOfInterest());
        roi=roi/1200;
        float monthlyPrincipal=pLeft/tLeft;
        LocalDate eDate = LocalDate.parse(cLoan.getEmiDate());
        eDate = eDate.plusMonths(1);

        pLeft=pLeft-monthlyPrincipal-(amount-emi);
        paidEmi=paidEmi+1;
        tLeft= tLeft-1 -(int) ((amount-emi)/monthlyPrincipal);
        tAmount=tAmount+amount;

        if(amount-emi>0) {
            emi = (float) ((pLeft * roi * Math.pow((1 + roi), tLeft)) / (Math.pow((1 + roi), tLeft) - 1));
        }



        if(pLeft<10){
            cLoan.setLoanStatus("completed");
            cLoan.setPrincipalLeft("0");
            cLoan.setLoanTenurePending("0");
            cLoan.setLoanEmi("0");
        }
        else{
            cLoan.setPrincipalLeft(Float.toString(pLeft));
            cLoan.setLoanTenurePending(Integer.toString(tLeft));
            cLoan.setLoanEmi(Float.toString(emi));
        }
        cLoan.setPaidEmiNumber(Integer.toString(paidEmi));
        cLoan.setTotalAmountPaid(Float.toString(tAmount));
        if(tLeft!=0){
            cLoan.setEmiDate(eDate.toString());
        }
        return loanInfoRepository.save(cLoan);

    }
//
//    @Override
//    Loan updateLoan(String email,Loan newLoan, String id){
//        // various operations according to new loan
//        return new Loan();
//    }
    @Override
    public List<LoanInfo> getAllLoans(){
    return loanInfoRepository.findAll();
}

    @Override
    public String approveLoanById(String loanId) {
        LoanInfo loanInfo = loanInfoRepository.getByLoanId(loanId);
        loanInfo.setLoanStatus("approved");
        LocalDate localDate = LocalDate.now();
        loanInfo.setEmiDate(localDate.toString());
        loanInfoRepository.save(loanInfo);
        return "Approved";
    }

    @Override
    public String rejectLoanById(String loanId) {
        LoanInfo loanInfo = loanInfoRepository.getByLoanId(loanId);
        loanInfo.setLoanStatus("rejected");
        LocalDate localDate = LocalDate.now();
        loanInfo.setEmiDate(localDate.toString());
        loanInfoRepository.save(loanInfo);
        return "Rejected";
    }
}
