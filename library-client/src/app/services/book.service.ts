import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {CommonReturnType} from '../models/CommonReturnType';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {BookModel} from '../models/book.model';

@Injectable()
export class BookService {

  book: BookModel;
  editMode: boolean;

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

  getBookById(id: number) {
    return this.http
      .get<CommonReturnType>(
        environment.baseUrl + environment.book + '/' + id,
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

  getBookByTitle(title: string) {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('title', title);
    return this.http
      .get<CommonReturnType>(
        environment.baseUrl + environment.book + environment.title,
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

  getBookByAuthor(author: string) {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('author', author);
    return this.http
      .get<CommonReturnType>(
        environment.baseUrl + environment.book + environment.author,
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

  getBookByIsbn(isbn: string) {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('isbn', isbn);
    return this.http
      .get<CommonReturnType>(
        environment.baseUrl + environment.book + environment.isbn,
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

  editBook(editBook: BookModel) {
    return this.http
      .put<CommonReturnType>(
        environment.baseUrl + environment.book,
        editBook,
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

  deleteBook(id: number) {
    return this.http
      .delete<CommonReturnType>(
        environment.baseUrl + environment.book + '/' + id,
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
