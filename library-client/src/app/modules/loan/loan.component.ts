import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {NgForm} from '@angular/forms';
import {MatSelectChange} from '@angular/material/select';
import {DeleteDialogComponent} from '../library/library.component';
import {LoanModel} from '../../models/loan.model';
import {LoanService} from '../../services/loan.service';


interface Option {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss']
})
export class LoanComponent implements OnInit {
  loan: LoanModel;
  loans: LoanModel[] = [];
  options: Option[] = [
    {value: 'id-0', viewValue: 'id'},
    {value: 'title-1', viewValue: 'title'},
    {value: 'member-2', viewValue: 'author'}
  ];
  option: string;
  searched: boolean;

  constructor(private loanService: LoanService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loanService.getLoans().subscribe(
      data => {
        this.loans = (data as LoanModel[]);
      }
    );
  }

  addLoan() {
    this.router.navigate(['/addloan']);
  }

  editLoan(loanModel: LoanModel) {
    this.loanService.editMode = true;
    this.loanService.loan = loanModel;
    this.router.navigate(['/addloan']);
  }

  confirmDelete(i: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: this.loans[i].id
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loanService.deleteLoan(this.loans[i].id).subscribe(
          () => {
            this.loanService.getLoans().subscribe(
              loans => {
                this.loans = (loans as LoanModel[]);
              }
            );
          }
        );
      }
    });
  }

  onSearch(f: NgForm) {
    const value = f.value;
    if (this.option === 'id-0') {
      this.loanService.getLoanById(value.search).subscribe(
        data => {
          this.searched = true;
          this.loan = (data as LoanModel);
        }
      );
    } else if (this.option === 'title-1') {
      this.loanService.getLoansByBook(value.search).subscribe(
        data => {
          this.loans = (data as LoanModel[]);
        }
      );
    } else if (this.option === 'member-2') {
      this.loanService.getLoansByMember(value.search).subscribe(
        data => {
          this.loans = (data as LoanModel[]);
        }
      );
    }
  }

  change($event: MatSelectChange) {
    this.option = $event.value;
  }

  listLoans() {
    this.loanService.getLoans().subscribe(
      data => {
        this.loans = (data as LoanModel[]);
      }
    );
  }
}
