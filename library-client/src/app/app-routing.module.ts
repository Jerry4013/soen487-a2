import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DefaultComponent} from './layouts/default/default.component';
import {LibraryComponent} from './modules/library/library.component';
import {MemberComponent} from './modules/member/member.component';
import {LoanComponent} from './modules/loan/loan.component';
import {ContactsComponent} from './modules/contacts/contacts.component';
import {LeadsComponent} from './modules/leads/leads.component';
import {LoginComponent} from './modules/login/login.component';
import {AuthGuardService} from './services/auth-guard.service';
import {AddbookComponent} from './modules/addbook/addbook.component';
import {HelpComponent} from './modules/help/help.component';
import {AddMemberComponent} from './modules/add-member/add-member.component';
import {AddLoanComponent} from './modules/add-loan/add-loan.component';


const routes: Routes = [{
    path: '',
    component: DefaultComponent,
    children: [
      {path: '', component: LoginComponent},
      {path: 'help', component: HelpComponent, canActivate: [AuthGuardService]},
      {path: 'library', component: LibraryComponent, canActivate: [AuthGuardService]},
      {path: 'member', component: MemberComponent, canActivate: [AuthGuardService]},
      {path: 'loan', component: LoanComponent, canActivate: [AuthGuardService]},
      {path: 'contacts', component: ContactsComponent, canActivate: [AuthGuardService]},
      {path: 'leads', component: LeadsComponent, canActivate: [AuthGuardService]},
      {path: 'addbook', component: AddbookComponent, canActivate: [AuthGuardService]},
      {path: 'addmember', component: AddMemberComponent, canActivate: [AuthGuardService]},
      {path: 'addloan', component: AddLoanComponent, canActivate: [AuthGuardService]}
      ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
