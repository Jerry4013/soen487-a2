package soen487.a2.loan.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import soen487.a2.loan.dataobject.LoanDao;
import soen487.a2.loan.repository.LoanJpaRepository;

import java.util.List;

@Service
public class LoanServiceImpl implements LoanService {

    @Autowired
    private LoanJpaRepository loanJpaRepository;

    @Override
    public List<LoanDao> getAllLoansByBook(String title) {
        return loanJpaRepository.getLoanDaosByTitle(title);
    }

    @Override
    public List<LoanDao> getAllLoansByMember(String member) {
        return loanJpaRepository.getLoanDaosByMember(member);
    }

    @Override
    public LoanDao getLoan(int id) {
        return loanJpaRepository.findById(id).orElse(null);
    }

    @Override
    public LoanDao borrow(LoanDao loanDao) {
        return loanJpaRepository.save(loanDao);
    }

    @Override
    public LoanDao updateLoan(LoanDao loanDao) {
        return loanJpaRepository.save(loanDao);
    }

    @Override
    public LoanDao returnItem(int id, String returndate) {
        LoanDao loan = getLoan(id);
        loan.setReturndate(returndate);
        return loanJpaRepository.save(loan);
    }

    @Override
    public LoanDao deleteLoan(int id) {
        LoanDao loanDao = loanJpaRepository.findById(id).orElse(null);
        loanJpaRepository.deleteById(id);
        return loanDao;
    }


}
