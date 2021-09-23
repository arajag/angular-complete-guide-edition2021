import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

interface AuthResponseData {
  idToken: 'string';
  email: 'string';
  refreshToken: 'string';
  expiresIn: 'string';
  localId: 'string';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCkleHICYXwqhK-3MyHTXtKEoA55EjaWmw',
      {
        email: email,
        password: password,
        returnSecureToken: true
      });
  }

}
