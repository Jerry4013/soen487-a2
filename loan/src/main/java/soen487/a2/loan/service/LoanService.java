package soen487.a2.loan.service;

import soen487.a2.loan.dataobject.LoanDao;

import java.util.List;

public interface LoanService {
    List<LoanDao> getAllLoansByBook(String title);
    List<LoanDao> getAllLoansByMember(String member);
    LoanDao getLoan(int id);
    LoanDao borrow(LoanDao loanDao);
    LoanDao updateLoan(LoanDao loanDao);
    LoanDao returnItem(int id, String returndate);
    LoanDao deleteLoan(int id);
}
