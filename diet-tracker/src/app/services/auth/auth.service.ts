import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';
import { User } from '../../models/User';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ResponseDataFormat } from 'src/app/models/ResponseDataFormat';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private serverURL: string = "http://localhost:3001/diet-tracker-api"
  currentUser$ = new BehaviorSubject<User>(null);
  private httpOptions = {
    headers : new HttpHeaders ({
      'Content-type': 'application/json; charset=UTF-8'
    }),
  }

  constructor(private http: HttpClient, private router: Router) {}

  signup(user: User): Observable<ResponseDataFormat> {
    const url = `${this.serverURL}/users`
    return this.http.post<ResponseDataFormat>(url, user, this.httpOptions)
      .pipe(catchError(this.handleError),
        tap(resData => {
        this.handleAuthentication(resData)
      }))
  }

  login(user: {[key:string]: string}): Observable<ResponseDataFormat> {
    const url = `${this.serverURL}/users/login`
    return this.http.post<ResponseDataFormat>(url, user, this.httpOptions)
      .pipe(catchError(this.handleError),
        tap(resData => {
        this.handleAuthentication(resData)
      }))
  }

  logout(){
    const url = `${this.serverURL}/users/logout`
    this.http.post(url, null).subscribe(res => {
      this.clearUser();
    })
  }

  updateName(name: string): Observable<ResponseDataFormat> {
    const url = `${this.serverURL}/users/name`;
    return this.http.patch<ResponseDataFormat>(url, { name }, this.httpOptions)
      .pipe(catchError(this.handleError),
        tap(resData => {
          this.handleUpdate(resData, {name})
        }))
  }

  updateEmail(email:string): Observable<ResponseDataFormat> {
    const url = `${this.serverURL}/users/email`;
    return this.http.patch<ResponseDataFormat>(url, { email }, this.httpOptions)
      .pipe(catchError(this.handleError),
        tap(resData => {
          this.handleUpdate(resData, {email})
        }))
  }

  updatePassword(password:string): Observable<ResponseDataFormat> {
    const url = `${this.serverURL}/users/password`;
    return this.http.patch<ResponseDataFormat>(url, { password }, this.httpOptions)
      .pipe(catchError(this.handleError))
  }

  confirmPassword(password: string) {
    const url = `${this.serverURL}/users/confirm`;
    return this.http.post<any>(url, { password }, this.httpOptions)
      .pipe(catchError(this.handleError))
  }

  deleteAccount() {
    const url = `${this.serverURL}/users/me`;
    this.http.delete(url, this.httpOptions).subscribe(res => {
      this.clearUser()
    })
  }

  // extra
  autoLogin() {
    const userData: {
      email: string;
      name: string;
      _id: string;
      token: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }
    const loadedUser : User = {
      email: userData.email,
      _id: userData._id,
      token: userData.token,
      name: userData.name
    };

    if (loadedUser.token) {
      this.currentUser$.next(loadedUser);
    }
  }

  private handleAuthentication(resData: ResponseDataFormat){
    const {user, token} = resData
    user.token = token;
    this.currentUser$.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleUpdate(resData: ResponseDataFormat, value: {[key:string]: string}){
    const {user, token} = resData
    user.token = token;
    this.currentUser$.next(user);

    // update local storage
    let userData = JSON.parse(localStorage.getItem('userData'));
    // ex. value: {name:"Errikos"} or {email:"test@hotmai.com"}
    userData[Object.keys(value)[0]] = user[Object.keys(value)[0]];
    localStorage.setItem('userData', JSON.stringify(userData));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
      return throwError(() => new Error('Something bad happened; please try again later.'));
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
      return throwError(() => new Error(error.error.error));
    }
  }

  private clearUser() {
    // cleanup
    this.currentUser$.next(null);
    localStorage.removeItem('userData')
    this.router.navigate(["/auth"]);
  }
}
