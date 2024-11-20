import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User, UserData } from '../../user-interfaces';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getData(): Observable<UserData> {
    return this.http.get<UserData>('https://reqres.in/api/users?page=1&per_page=20');
  }
}
