import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { UpdatedUser, User, UserData } from '../../interfaces/user-interfaces';
import { Route, Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private router: Router) { }

  getData(pageNumber: number, perPage: number): Observable<UserData> {
    return this.http.get<UserData>(`https://reqres.in/api/users?page=${pageNumber}&per_page=${perPage}`);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<{data: User}>(`https://reqres.in/api/users/${id}`).pipe(
      map(response => response.data),
      catchError(error => {
        this.router.navigateByUrl('/users');
        return throwError(() => error);
      }
      )
    );
  }

  editUser(userId: number, details: any): Observable<UpdatedUser> {
    return this.http.patch<UpdatedUser>(`https://reqres.in/api/users/${userId}`, details);
  }
}
