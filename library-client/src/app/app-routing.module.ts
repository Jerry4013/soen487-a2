import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DefaultComponent} from './layouts/default/default.component';
import {LibraryComponent} from './modules/library/library.component';
import {MemberComponent} from './modules/member/member.component';
import {LoanComponent} from './modules/loan/loan.component';
import {ContactsComponent} from './modules/contacts/contacts.component';
import {LeadsComponent} from './modules/leads/leads.component';


const routes: Routes = [{
    path: '',
    component: DefaultComponent,
    children: [
      {path: '', component: LibraryComponent},
      {path: 'member', component: MemberComponent},
      {path: 'loan', component: LoanComponent},
      {path: 'contacts', component: ContactsComponent},
      {path: 'leads', component: LeadsComponent}
      ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
