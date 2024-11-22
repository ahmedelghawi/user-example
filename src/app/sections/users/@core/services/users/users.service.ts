import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { UpdatedUser, User, UserData } from '../../interfaces/user-interfaces';
import { Route, Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl = 'https://reqres.in/api/users';

  constructor(private http: HttpClient, private router: Router) { }

  getData(pageNumber: number, perPage: number): Observable<UserData> {
    const params = new HttpParams()
      .set('page', pageNumber.toString())
      .set('per_page', perPage.toString());

    return this.http.get<UserData>(this.baseUrl, { params });
  }

  getUser(id: number): Observable<User> {
    return this.http.get<{data: User}>(`${this.baseUrl}/${id}`).pipe(
      map(response => response.data),
      catchError(error => {
        this.router.navigateByUrl('/users');
        return throwError(() => error);
      }
      )
    );
  }

  editUser(userId: number, details: any): Observable<UpdatedUser> {
    return this.http.patch<UpdatedUser>(`${this.baseUrl}/${userId}`, details);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${userId}`);
  }
}
