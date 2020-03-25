import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CommonReturnType} from './models/CommonReturnType';
import {environment} from '../environments/environment';
import {map} from 'rxjs/operators';

@Injectable()
export class BookService {


  constructor(private http: HttpClient) {
  }

  getBooks() {
    return this.http
      .get<CommonReturnType>(
        environment.baseUrl + environment.bookList,
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

  getBookById() {
    return this.http
      .get<CommonReturnType>(
        environment.baseUrl + environment.bookList,
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
