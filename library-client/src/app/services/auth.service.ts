import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {CommonReturnType} from '../models/CommonReturnType';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable()
export class AuthService {

  isLogin = false;

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string) {
    let myParams = new HttpParams();
    myParams = myParams.append('username', String(username));
    myParams = myParams.append('password', String(password));
    return this.http
      .post<CommonReturnType>(
        environment.baseUrl + environment.auth,
        {},
        {
          headers: new HttpHeaders({ 'withCredentials': 'true'}),
          params: myParams
        }
      ).pipe(map(responseData => {
          if (responseData.status === 'success') {
            return responseData.data;
          }
        })
      );
  }
}
