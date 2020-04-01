import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {LoanModel} from '../models/loan.model';
import {CommonReturnType} from '../models/CommonReturnType';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';


@Injectable()
export class LoanService {

  loan: LoanModel;
  editMode: boolean;

  constructor(private http: HttpClient) {
  }

  getLoans() {
    return this.http
      .get<CommonReturnType>(
        environment.baseUrl + environment.loan + environment.list,
        {
          headers: new HttpHeaders({ withCredentials: 'true'}),
        }
      ).pipe(map(responseData => {
          if (responseData.status === 'success') {
            return responseData.data;
          }
        })
      );
  }

  getLoanById(id: number) {
    return this.http
      .get<CommonReturnType>(
        environment.baseUrl + environment.loan + '/' + id,
        {
          headers: new HttpHeaders({ withCredentials: 'true'}),
        }
      ).pipe(map(responseData => {
          if (responseData.status === 'success') {
            return responseData.data;
          }
        })
      );
  }

  getLoansByBook(title: string) {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('title', title);
    return this.http
      .get<CommonReturnType>(
        environment.baseUrl + environment.loan + environment.listbybook,
        {
          params: httpParams,
          headers: new HttpHeaders({ withCredentials: 'true'}),
        }
      ).pipe(map(responseData => {
          if (responseData.status === 'success') {
            return responseData.data;
          }
        })
      );
  }

  getLoansByMember(member: string) {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('member', member);
    return this.http
      .get<CommonReturnType>(
        environment.baseUrl + environment.loan + environment.listbymember,
        {
          params: httpParams,
          headers: new HttpHeaders({ withCredentials: 'true'}),
        }
      ).pipe(map(responseData => {
          if (responseData.status === 'success') {
            return responseData.data;
          }
        })
      );
  }

  addLoan(loanModel: LoanModel) {
    return this.http
      .post<CommonReturnType>(
        environment.baseUrl + environment.loan,
        loanModel,
        {
          headers: new HttpHeaders({ withCredentials: 'true'}),
        }
      );
  }

  editLoan(loanModel: LoanModel) {
    return this.http
      .put<CommonReturnType>(
        environment.baseUrl + environment.loan,
        loanModel,
        {
          headers: new HttpHeaders({ 'withCredentials': 'true'}),
        }
      ).pipe(map(responseData => {
          if (responseData.status === 'success') {
            return responseData.data;
          }
        })
      );
  }

  returnBook(id: number, returndate: string) {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('id', String(id));
    httpParams = httpParams.append('returndate', returndate);
    return this.http
      .put<CommonReturnType>(
        environment.baseUrl + environment.loan + environment.returnBook,
        null,
        {
          params: httpParams,
          headers: new HttpHeaders({ 'withCredentials': 'true'}),
        }
      ).pipe(map(responseData => {
          if (responseData.status === 'success') {
            return responseData.data;
          }
        })
      );
  }

  deleteLoan(id: number) {
    return this.http
      .delete<CommonReturnType>(
        environment.baseUrl + environment.loan + '/' + id,
        {
          headers: new HttpHeaders({ 'withCredentials': 'true'}),
        }
      ).pipe(map(responseData => {
          if (responseData.status === 'success') {
            return responseData.data;
          }
        })
      );
  }
}
