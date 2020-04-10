package soen487.a2.loan.endpoint;

import io.spring.guides.gs_producing_web_service.*;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.client.RestTemplate;
import org.springframework.ws.server.endpoint.annotation.Endpoint;
import org.springframework.ws.server.endpoint.annotation.PayloadRoot;
import org.springframework.ws.server.endpoint.annotation.RequestPayload;
import org.springframework.ws.server.endpoint.annotation.ResponsePayload;

import soen487.a2.loan.CommonReturnType;
import soen487.a2.loan.dataobject.LoanDao;
import soen487.a2.loan.exception.MemberNotFoundException;
import soen487.a2.loan.exception.ServiceFaultException;
import soen487.a2.loan.service.LoanService;

import java.util.List;

@Endpoint
public class LoanEndpoint {
    private static final String NAMESPACE_URI = "http://spring.io/guides/gs-producing-web-service";

    @Autowired
    private LoanService loanService;

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "getAllLoansByBookRequest")
    @ResponsePayload
    public GetAllLoansByBookResponse getAllLoansByBook(@RequestPayload GetAllLoansByBookRequest request) {
        GetAllLoansByBookResponse response = new GetAllLoansByBookResponse();
        List<LoanDao> loanDaos = loanService.getAllLoansByBook(request.getTitle());
        List<Loan> loans = response.getLoan();
        for (LoanDao loanDao : loanDaos) {
            Loan loan = new Loan();
            BeanUtils.copyProperties(loanDao, loan);
            loans.add(loan);
        }
        return response;
    }

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "getAllLoansByMemberRequest")
    @ResponsePayload
    public GetAllLoansByMemberResponse getAllLoansByMember(@RequestPayload GetAllLoansByMemberRequest request) {
        GetAllLoansByMemberResponse response = new GetAllLoansByMemberResponse();
        List<LoanDao> loanDaos = loanService.getAllLoansByMember(request.getMember());
        List<Loan> loans = response.getLoan();
        for (LoanDao loanDao : loanDaos) {
            Loan loan = new Loan();
            BeanUtils.copyProperties(loanDao, loan);
            loans.add(loan);
        }
        return response;
    }

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "getLoanRequest")
    @ResponsePayload
    public GetLoanResponse getLoan(@RequestPayload GetLoanRequest request) {
        GetLoanResponse response = new GetLoanResponse();
        LoanDao loanDao = loanService.getLoan(request.getId());
        Loan loan = new Loan();
        BeanUtils.copyProperties(loanDao, loan);
        response.setLoan(loan);
        return response;
    }

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "borrowRequest")
    @ResponsePayload
    public BorrowResponse borrow(@RequestPayload BorrowRequest request) throws MemberNotFoundException {
        BorrowResponse response = new BorrowResponse();
        if (!checkBook(request.getTitle())) {
            throw new MemberNotFoundException("Book not exist");
        }
        LoanDao loanDao = new LoanDao();
        loanDao.setTitle(request.getTitle());
        loanDao.setMember(request.getMember());
        loanDao.setBorrowdate(request.getBorrowdate());
        loanDao.setReturndate(request.getReturndate());
        LoanDao newBorrow = loanService.borrow(loanDao);
        Loan loan = new Loan();
        BeanUtils.copyProperties(newBorrow, loan);
        response.setLoan(loan);
        return response;
    }

    private boolean checkBook(String title) throws MemberNotFoundException {
        String url = "http://localhost:8080/book/title?title=" + title;
        RestTemplate restTemplate = new RestTemplate();
        CommonReturnType returnType = restTemplate.getForObject(url, CommonReturnType.class);
        if (returnType == null || returnType.getStatus().equals("fail")) {
            throw new MemberNotFoundException("Invalid Member Id");
        }
        return true;
    }

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "updateLoanRequest")
    @ResponsePayload
    public UpdateLoanResponse updateLoan(@RequestPayload UpdateLoanRequest request) {
        UpdateLoanResponse response = new UpdateLoanResponse();
        LoanDao loanDao = new LoanDao();
        loanDao.setId(request.getId());
        loanDao.setTitle(request.getTitle());
        loanDao.setMember(request.getMember());
        loanDao.setBorrowdate(request.getBorrowdate());
        loanDao.setReturndate(request.getReturndate());
        LoanDao newBorrow = loanService.updateLoan(loanDao);
        Loan loan = new Loan();
        BeanUtils.copyProperties(newBorrow, loan);
        response.setLoan(loan);
        return response;
    }

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "returnItemRequest")
    @ResponsePayload
    public ReturnItemResponse returnItem(@RequestPayload ReturnItemRequest request) {
        ReturnItemResponse response = new ReturnItemResponse();
        LoanDao loanDao = loanService.returnItem(request.getId(), request.getReturndate());
        Loan loan = new Loan();
        BeanUtils.copyProperties(loanDao, loan);
        response.setLoan(loan);
        return response;
    }

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "deleteLoanRequest")
    @ResponsePayload
    public DeleteLoanResponse deleteLoan(@RequestPayload DeleteLoanRequest request) {
        DeleteLoanResponse response = new DeleteLoanResponse();
        LoanDao loanDao = loanService.deleteLoan(request.getId());
        Loan loan = new Loan();
        BeanUtils.copyProperties(loanDao, loan);
        response.setLoan(loan);
        return response;
    }
}