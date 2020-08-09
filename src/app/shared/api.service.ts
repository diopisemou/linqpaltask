import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Admin } from '../models/admin';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Injectable({
  providedIn: 'root'
})

export class ApiService {

  endpoint: string = 'http://localhost:8000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(private http: HttpClient, public router: Router ) { }

  // Login User
  LoginAdmin(data: Admin): Observable<any> {
    let API_URL = `${this.endpoint}/login`;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Add user
  LogoutAdmin(data: Admin): Observable<any> {
    let API_URL = `${this.endpoint}/logout`;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Add user
  AddUser(data: User): Observable<any> {
    let API_URL = `${this.endpoint}/add-user`;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Get all users
  GetUsers() {
    return this.http.get(`${this.endpoint}/users`);
  }

  // Get user
  GetUser(id): Observable<any> {
    let API_URL = `${this.endpoint}/read-user/${id}`;
    return this.http.get(API_URL, { headers: this.headers })
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.handleError)
      )
  }

  // // Update user
  // UpdateUser(id, data): Observable<any> {
  //   let API_URL = `${this.endpoint}/update-user/${id}`;
  //   return this.http.put(API_URL, data, { headers: this.headers })
  //     .pipe(
  //       catchError(this.errorMgmt)
  //     )
  // }

  // Delete user
  DeleteUser(id): Observable<any> {
    var API_URL = `${this.endpoint}/delete-user/${id}`;
    return this.http.delete(API_URL)
      .pipe(
        catchError(this.handleError)
      )
  }

   // Sign-up
   signUp(user: User): Observable<any> {
    let api = `${this.endpoint}/register-user`;
    return this.http.post(api, user)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Sign-in
  signIn(user: User) {
    return this.http.post<any>(`${this.endpoint}/signin`, user)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token)
        this.getUserProfile(res._id).subscribe((res) => {
          this.currentUser = res;
          Swal.fire('Hi', 'Login Successful !', 'success')
          this.router.navigate(['/home'], { replaceUrl: true });
          //this.router.navigate(['/admin/list-user/'], { replaceUrl: true });
        })
      })
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['log-in']);
    }
  }

  // User profile
  getUserProfile(id): Observable<any> {
    let api = `${this.endpoint}/user-profile/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  

  // Error handling 
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}