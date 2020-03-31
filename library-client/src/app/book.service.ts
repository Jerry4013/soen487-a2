import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CommonReturnType} from './models/CommonReturnType';
import {environment} from '../environments/environment';
import {map} from 'rxjs/operators';
import {BookModel} from './models/book.model';

@Injectable()
export class BookService {


  constructor(private http: HttpClient) {
  }

  getBooks() {
    return this.http
      .get<CommonReturnType>(
        environment.baseUrl + environment.book + environment.list,
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
        environment.baseUrl + environment.book,
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

  addBook(newBook: BookModel) {
    return this.http
      .post<CommonReturnType>(
        environment.baseUrl + environment.book,
        newBook,
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
