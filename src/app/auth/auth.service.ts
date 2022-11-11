import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { catchError, Subject, tap, throwError } from "rxjs";
import { User } from "./user.model";

export interface authResponseData {
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

  user = new Subject<User>

  constructor(private http: HttpClient) { }

  signUp(email: string, password: string) {
    return this.http.post<authResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBiNKlxN786h_nYTHIcNxnNidY2GSrydBw', {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError), tap(resData => this.handlingAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)))
  }

  loginIn(email: string, password: string) {
    return this.http.post<authResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBiNKlxN786h_nYTHIcNxnNidY2GSrydBw', {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError), tap(resData => this.handlingAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)))
  }

  private handlingAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
    const user = new User(email, userId, token, expirationDate)
    this.user.next(user)
  }

  private handleError(resError: HttpErrorResponse) {
    let errorMessage = 'an unknown error'

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
        break;
    }

    return throwError(errorMessage)
  }
}
