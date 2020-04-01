import { Component, OnInit } from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {LoanModel} from '../../models/loan.model';
import {LoanService} from '../../services/loan.service';
import {DatePipe} from '@angular/common';
import {CommonReturnType} from '../../models/CommonReturnType';
import {ErrorModel} from '../../models/error.model';


@Component({
  selector: 'app-add-loan',
  templateUrl: './add-loan.component.html',
  styleUrls: ['./add-loan.component.scss']
})
export class AddLoanComponent implements OnInit {

  loan: LoanModel = this.loanService.loan;
  editMode = this.loanService.editMode;
  pageTitle: string;
  errorMessage: string;

  constructor(private loanService: LoanService,
              private route: ActivatedRoute,
              private router: Router,
              public datePipe: DatePipe) { }

  ngOnInit(): void {
    if (this.editMode) {
      this.pageTitle = 'Edit this Loan: ';
    } else {
      this.pageTitle = 'Borrow a book: ';
    }
  }

  onSubmit(f: NgForm) {
    const value = f.value;
    let id = 0;
    if (this.editMode) {
      id = this.loan.id;
    }
    const borrowDate = this.datePipe.transform(value.borrowdate, 'MM/dd/yyyy');
    const returnDate = this.datePipe.transform(value.returndate, 'MM/dd/yyyy');
    const loanModel = new LoanModel(id, value.title, value.member, borrowDate, returnDate);
    if (!this.editMode) {
      this.loanService.addLoan(loanModel).subscribe(
        responseData => {
          const data = (responseData as CommonReturnType);
          if (data.status === 'success') {
            this.router.navigate(['/loan']);
          } else {
            this.errorMessage = (data.data as ErrorModel).errMsg;
          }
        }
      );
    } else {
      this.loanService.editLoan(loanModel).subscribe(
        () => {
          this.router.navigate(['/loan']);
        }
      );
      this.loanService.editMode = false;
      this.editMode = false;
    }
  }

  onCancel() {
    this.router.navigate(['/loan']);
    if (this.editMode) {
      this.loanService.editMode = false;
      this.editMode = false;
    }
  }

}
