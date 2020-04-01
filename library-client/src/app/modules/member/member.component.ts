import {Component, OnInit} from '@angular/core';
import {BookModel} from '../../models/book.model';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {NgForm} from '@angular/forms';
import {MatSelectChange} from '@angular/material/select';
import {MemberModel} from '../../models/member.model';
import {MemberService} from '../../services/member.service';
import {DeleteDialogComponent} from '../library/library.component';

interface Option {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {

  member: MemberModel;
  members: MemberModel[] = [];
  options: Option[] = [
    {value: 'id-0', viewValue: 'id'},
    {value: 'name-1', viewValue: 'name'}
  ];
  option: string;
  searched: boolean;

  constructor(private memberService: MemberService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.memberService.getMembers().subscribe(
      data => {
        this.members = (data as MemberModel[]);
      }
    );
  }

  addMember() {
    this.router.navigate(['/addmember']);
  }

  editMember(member: MemberModel) {
    this.memberService.editMode = true;
    this.memberService.member = member;
    this.router.navigate(['/addmember']);
  }

  confirmDelete(i: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: this.members[i].id
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.memberService.deleteMember(this.members[i].id).subscribe(
          () => {
            this.memberService.getMembers().subscribe(
              members => {
                this.members = (members as MemberModel[]);
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
      this.memberService.getMemberById(value.search).subscribe(
        data => {
          this.searched = true;
          this.member = (data as MemberModel);
        }
      );
    } else if (this.option === 'name-1') {
      this.memberService.getMemberByName(value.search).subscribe(
        data => {
          this.searched = true;
          this.member = (data as MemberModel);
        }
      );
    }
  }

  change($event: MatSelectChange) {
    this.option = $event.value;
  }
}
