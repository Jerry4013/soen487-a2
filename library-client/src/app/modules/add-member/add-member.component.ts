import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {MemberModel} from '../../models/member.model';
import {MemberService} from '../../services/member.service';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss']
})
export class AddMemberComponent implements OnInit {

  member: MemberModel = this.memberService.member;
  editMode = this.memberService.editMode;
  pageTitle: string;

  constructor(private memberService: MemberService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    if (this.editMode) {
      this.pageTitle = 'Edit this Member: ';
    } else {
      this.pageTitle = 'Add a New Member: ';
    }
  }

  onSubmit(f: NgForm) {
    const value = f.value;
    let id = 0;
    if (this.editMode) {
      id = this.member.id;
    }
    const memberModel = new MemberModel(id, value.name, value.contact);
    if (!this.editMode) {
      this.memberService.addMember(memberModel).subscribe(
        () => {
          this.router.navigate(['/member']);
        }
      );
    } else {
      this.memberService.editMember(memberModel).subscribe(
        () => {
          this.router.navigate(['/member']);
        }
      );
      this.memberService.editMode = false;
      this.editMode = false;
    }
  }

  onCancel() {
    this.router.navigate(['/member']);
    if (this.editMode) {
      this.memberService.editMode = false;
      this.editMode = false;
    }
  }
}
