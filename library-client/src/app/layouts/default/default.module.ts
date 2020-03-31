import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import {BookService} from '../../book.service';
import {HttpClientModule} from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { LoginComponent } from '../../modules/login/login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from '../../auth.service';
import {AuthGuardService} from '../../auth-guard.service';
import { AddbookComponent } from '../../modules/addbook/addbook.component';

import {MatDialogModule} from '@angular/material/dialog';




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
    DeleteDialogComponent
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
    ReactiveFormsModule
  ],
  providers: [
    BookService,
    AuthService,
    AuthGuardService
  ],
})
export class DefaultModule { }
