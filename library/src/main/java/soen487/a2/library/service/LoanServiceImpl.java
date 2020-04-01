package soen487.a2.library.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import soen487.a2.library.dataobject.Book;
import soen487.a2.library.dataobject.Loan;
import soen487.a2.library.dataobject.Member;
import soen487.a2.library.error.BusinessException;
import soen487.a2.library.error.EmBusinessError;
import soen487.a2.library.model.LoanModel;
import soen487.a2.library.model.MemberModel;
import soen487.a2.library.repository.BookJpaRepository;
import soen487.a2.library.repository.LoanJpaRepository;
import soen487.a2.library.repository.MemberJpaRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class LoanServiceImpl implements LoanService {

    private final BookJpaRepository bookJpaRepository;
    private final LoanJpaRepository loanJpaRepository;
    private final MemberJpaRepository memberJpaRepository;

    @Autowired
    public LoanServiceImpl(BookJpaRepository bookJpaRepository,
                           LoanJpaRepository loanJpaRepository,
                           MemberJpaRepository memberJpaRepository) {
        this.bookJpaRepository = bookJpaRepository;
        this.loanJpaRepository = loanJpaRepository;
        this.memberJpaRepository = memberJpaRepository;
    }

    @Override
    public List<LoanModel> getAllLoans() {
        List<Loan> list = loanJpaRepository.findAll();
        List<LoanModel> loanModels = new ArrayList<>();
        for (Loan loan : list) {
            LoanModel loanModel = new LoanModel();
            BeanUtils.copyProperties(loan, loanModel);
            loanModels.add(loanModel);
        }
        return loanModels;
    }

    @Override
    public List<LoanModel> getAllLoansByBook(String title) {
        Book book = bookJpaRepository.getBookByTitle(title);
        if (book == null) {
            throw new BusinessException(EmBusinessError.BOOK_NOT_EXIST);
        }
        List<Loan> loans = loanJpaRepository.getLoansByTitle(title);
        List<LoanModel> loanModels = new ArrayList<>();
        for (Loan loan : loans) {
            LoanModel loanModel = new LoanModel();
            BeanUtils.copyProperties(loan, loanModel);
            loanModels.add(loanModel);
        }
        return loanModels;
    }

    @Override
    public List<LoanModel> getAllLoansByMember(String name) {
        Member member = memberJpaRepository.getMemberByName(name);
        if (member == null) {
            throw new BusinessException(EmBusinessError.MEMBER_NOT_EXIST);
        }
        List<Loan> loans = loanJpaRepository.getLoansByMember(name);
        List<LoanModel> loanModels = new ArrayList<>();
        for (Loan loan : loans) {
            LoanModel loanModel = new LoanModel();
            BeanUtils.copyProperties(loan, loanModel);
            loanModels.add(loanModel);
        }
        return loanModels;
    }

    @Override
    public LoanModel getLoan(int id) {
        Loan loan = loanJpaRepository.findById(id).orElse(null);
        if (loan == null) {
            throw new BusinessException(EmBusinessError.LOAN_NOT_EXIST);
        }
        LoanModel loanModel = new LoanModel();
        BeanUtils.copyProperties(loan, loanModel);
        return loanModel;
    }

    @Override
    @Transactional
    public LoanModel borrow(LoanModel loanModel) {
        if (loanModel == null) {
            throw new BusinessException(EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        Loan loan = new Loan();
        BeanUtils.copyProperties(loanModel, loan);
        Loan save = loanJpaRepository.save(loan);
        loanModel.setId(save.getId());
        return loanModel;
    }

    @Override
    @Transactional
    public LoanModel updateLoan(LoanModel loanModel) {
        return borrow(loanModel);
    }

    @Override
    @Transactional
    public LoanModel returnItem(int id, String returndate) {
        Loan loan = loanJpaRepository.findById(id).orElse(null);
        if (loan == null) {
            throw new BusinessException(EmBusinessError.LOAN_NOT_EXIST);
        }
        loan.setReturndate(returndate);
        Loan save = loanJpaRepository.save(loan);
        LoanModel loanModel = new LoanModel();
        BeanUtils.copyProperties(save, loanModel);
        return loanModel;
    }

    @Override
    @Transactional
    public LoanModel deleteLoan(int id) {
        Loan loan = loanJpaRepository.findById(id).orElse(null);
        if (loan == null) {
            throw new BusinessException(EmBusinessError.LOAN_NOT_EXIST);
        }
        LoanModel loanModel = new LoanModel();
        BeanUtils.copyProperties(loan, loanModel);
        loanJpaRepository.deleteById(id);
        return loanModel;
    }
}
