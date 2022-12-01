import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { BehaviorSubject, tap, throwError } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

export interface AuthResponseData {
  kind: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null)
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) { }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      catchError(this.handleError), tap(resData => this.handlingAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)))
  }

  loginIn(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      catchError(this.handleError), tap(resData => this.handlingAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)));
  }

  autoLoginIn() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'))
    if (!userData) {
      return
    }

    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate))

    if (loadedUser.token) {
      this.user.next(loadedUser)
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
      this.autoLogOut(expirationDuration)
    }
  }

  logOut() {
    this.user.next(null)
    this.router.navigate(['/auth'])
    localStorage.removeItem('userData')

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer)
    }
    this.tokenExpirationTimer = null
  }

  autoLogOut(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logOut()
    }, expirationDuration)
  }

  private handlingAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
    const user = new User(email, userId, token, expirationDate)
    this.user.next(user)
    this.autoLogOut(expiresIn * 1000)
    localStorage.setItem('userData', JSON.stringify(user))
  }

  private handleError(resError: HttpErrorResponse) {
    let errorMessage = 'an unknown error';
    if (!resError.error || !resError.error.error) {
      return throwError(errorMessage)
    }
    switch (resError.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'The email address is already in use by another account';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'The password is invalid or the user does not have a password';
    }
    return throwError(errorMessage);
  }
}
