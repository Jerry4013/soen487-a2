import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {DefaultComponent} from './default.component';
import {DeleteDialogComponent, LibraryComponent} from '../../modules/library/library.component';
import {RouterModule} from '@angular/router';
import {MemberComponent} from '../../modules/member/member.component';
import {LoanComponent} from '../../modules/loan/loan.component';
import {SharedModule} from '../../shared/shared.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDividerModule} from '@angular/material/divider';
import {MatTableModule} from '@angular/material/table';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ContactsComponent} from '../../modules/contacts/contacts.component';
import { LeadsComponent } from '../../modules/leads/leads.component';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {BookService} from '../../services/book.service';
import {HttpClientModule} from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { LoginComponent } from '../../modules/login/login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {AuthGuardService} from '../../services/auth-guard.service';
import { AddbookComponent } from '../../modules/addbook/addbook.component';

import {MatDialogModule} from '@angular/material/dialog';
import { HelpComponent } from '../../modules/help/help.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import { AddMemberComponent } from '../../modules/add-member/add-member.component';
import { AddLoanComponent } from '../../modules/add-loan/add-loan.component';
import {MemberService} from '../../services/member.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {LoanService} from '../../services/loan.service';




@NgModule({
  declarations: [
    DefaultComponent,
    LibraryComponent,
    MemberComponent,
    LoanComponent,
    ContactsComponent,
    LeadsComponent,
    LoginComponent,
    AddbookComponent,
    DeleteDialogComponent,
    HelpComponent,
    AddMemberComponent,
    AddLoanComponent
  ],
  entryComponents: [
    DeleteDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    FlexLayoutModule,
    MatPaginatorModule,
    MatTableModule,
    MatCardModule,
    MatListModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSelectModule,
    MatDatepickerModule
  ],
  providers: [
    BookService,
    MemberService,
    LoanService,
    AuthService,
    AuthGuardService,
    DatePipe
  ],
})
export class DefaultModule { }
