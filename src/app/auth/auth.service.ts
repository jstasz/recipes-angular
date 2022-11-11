import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { catchError, throwError } from "rxjs";

interface authResponseData {
  kind: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signUp(email: string, password: string) {
    return this.http.post<authResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBiNKlxN786h_nYTHIcNxnNidY2GSrydBw', {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(resError => {
      let errorMessage = 'an unknown error'

      if (!resError.error || !resError.error.error) {
        return throwError(errorMessage)
      }

      switch (resError.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'The email address is already in use by another account'
      }

      return throwError(errorMessage)
    }))
  }
}
