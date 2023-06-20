import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';
import { User } from '../models/User';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ResponseDataFormat } from '../models/ResponseDataFormat';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private serverURL: string = "http://localhost:3001/diet-tracker-api"
  // foodbaseURL: string = "https://api.edamam.com/api/food-database/v2/parser"
  currentUser$ = new BehaviorSubject<User>(null);
  private httpOptions = {
    headers : new HttpHeaders ({
      'Content-type': 'application/json; charset=UTF-8'
    }),
  }

  constructor(private http: HttpClient, private router: Router) {}

  signup(user: User) {
    const url = `${this.serverURL}/users`
    return this.http.post<ResponseDataFormat>(url, user, this.httpOptions)
      .pipe(catchError(this.handleError),
        tap(resData => {
        this.handleAuthentication(resData)
      }))
  }

  login(user: {[key:string]: string}) {
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
      console.log(res);
      // cleanup
      this.currentUser$.next(null);
      localStorage.removeItem('userData')
      this.router.navigate(["/auth"]);
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

  handleAuthentication(resData: ResponseDataFormat){
    const {user, token} = resData
    user.token = token;
    this.currentUser$.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
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
}
