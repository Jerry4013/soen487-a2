package soen487.a2.library.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import soen487.a2.library.CommonReturnType;
import soen487.a2.library.model.LoanModel;
import soen487.a2.library.service.LoanService;

import java.util.List;

@RestController
@RequestMapping("/loan")
@CrossOrigin(origins = {"*"}, allowCredentials = "true")
public class LoanController {

    private final LoanService loanService;

    @Autowired
    public LoanController(LoanService loanService) {
        this.loanService = loanService;
    }

    @GetMapping(value = "/list")
    public CommonReturnType getLoans() {
        List<LoanModel> loans = loanService.getAllLoans();
        return CommonReturnType.create(loans);
    }

    @GetMapping(value = "/listbybook")
    public CommonReturnType getListByBook(@RequestParam String title) {
        List<LoanModel> loans = loanService.getAllLoansByBook(title);
        return CommonReturnType.create(loans);
    }

    @GetMapping(value = "/listbymember")
    public CommonReturnType getListByMember(@RequestParam String member) {
        List<LoanModel> loans = loanService.getAllLoansByMember(member);
        return CommonReturnType.create(loans);
    }

    @GetMapping(value = "/{id}")
    public CommonReturnType getLoanById(@PathVariable String id) {
        LoanModel loan = loanService.getLoan(Integer.parseInt(id));
        return CommonReturnType.create(loan);
    }

    @PostMapping()
    @Transactional
    public CommonReturnType borrow(@RequestBody LoanModel loanModel) {
        LoanModel borrow = loanService.borrow(loanModel);
        return CommonReturnType.create(borrow);
    }

    @PutMapping()
    @Transactional
    public CommonReturnType updateLoan(@RequestBody LoanModel loanModel) {
        LoanModel loan = loanService.updateLoan(loanModel);
        return CommonReturnType.create(loan);
    }

    @PutMapping(value = "/return")
    @Transactional
    public CommonReturnType returnItem(@RequestParam String id, @RequestParam String returndate) {
        LoanModel loan = loanService.returnItem(Integer.parseInt(id), returndate);
        return CommonReturnType.create(loan);
    }

    @DeleteMapping(value = "/{id}")
    @Transactional
    public CommonReturnType deleteLoan(@PathVariable String id) {
        LoanModel loan = loanService.deleteLoan(Integer.parseInt(id));
        return CommonReturnType.create(loan);
    }
}
