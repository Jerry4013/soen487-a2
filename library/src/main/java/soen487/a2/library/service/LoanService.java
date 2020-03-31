package soen487.a2.library.service;

import soen487.a2.library.model.LoanModel;

import java.util.List;

public interface LoanService {
    List<LoanModel> getAllLoansByBook(String title);
    List<LoanModel> getAllLoansByMember(String member);
    LoanModel getLoan(int id);
    LoanModel borrow(LoanModel loan);
    LoanModel updateLoan(LoanModel loan);
    LoanModel returnItem(int id, String returndate);
    LoanModel deleteLoan(int id);
}
