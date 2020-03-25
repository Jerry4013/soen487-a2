import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DefaultComponent} from './default.component';
import {LibraryComponent} from '../../modules/library/library.component';
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



@NgModule({
  declarations: [
    DefaultComponent,
    LibraryComponent,
    MemberComponent,
    LoanComponent,
    ContactsComponent,
    LeadsComponent
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
    MatButtonModule
  ],
  providers: [BookService],
})
export class DefaultModule { }
