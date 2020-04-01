import {Injectable} from '@angular/core';
import {MemberModel} from '../models/member.model';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {CommonReturnType} from '../models/CommonReturnType';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable()
export class MemberService {
  member: MemberModel;
  editMode: boolean;
  constructor(private http: HttpClient) {
  }

  getMembers() {
    return this.http
      .get<CommonReturnType>(
        environment.baseUrl + environment.member + environment.list,
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

  getMemberById(id: number) {
    return this.http
      .get<CommonReturnType>(
        environment.baseUrl + environment.member + '/' + id,
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

  getMemberByName(name: string) {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('name', name);
    return this.http
      .get<CommonReturnType>(
        environment.baseUrl + environment.member + environment.name,
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

  addMember(newMember: MemberModel) {
    return this.http
      .post<CommonReturnType>(
        environment.baseUrl + environment.member,
        newMember,
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

  editMember(editMember: MemberModel) {
    return this.http
      .put<CommonReturnType>(
        environment.baseUrl + environment.member,
        editMember,
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

  deleteMember(id: number) {
    return this.http
      .delete<CommonReturnType>(
        environment.baseUrl + environment.member + '/' + id,
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
