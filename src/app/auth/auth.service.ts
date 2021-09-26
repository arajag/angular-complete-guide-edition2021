import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {User} from './user.model';
import {Router} from '@angular/router';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

export interface AuthResponseData {
  idToken: 'string';
  email: 'string';
  refreshToken: 'string';
  expiresIn: 'string';
  localId: 'string';
  registered?: boolean;
}

const userDataLocalStorage = 'userData';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient,
              private router: Router,
              private store: Store<fromApp.AppState>) {
  }

  autoLogin() {
    const userData: UserData = JSON.parse(localStorage.getItem(userDataLocalStorage));
    if (!userData) return;
    const loadedUser = new User(userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate));
    if (loadedUser.token) {
      // this.user.next(loadedUser);
      this.store.dispatch(new AuthActions.AuthenticateSuccess({
        email: loadedUser.email,
        userId: loadedUser.id,
        token: loadedUser.token,
        expirationDate: new Date(userData._tokenExpirationDate)
      }));
      const expirationDuration = //
        new Date(userData._tokenExpirationDate).getTime() //
        - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    // this.user.next(null);
    this.store.dispatch(new AuthActions.Logout());
    localStorage.removeItem(userDataLocalStorage);
    if (this.tokenExpirationTimer) clearTimeout(this.tokenExpirationTimer);
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => this.logout(), expirationDuration);
  }
}

type UserData = {
  email: string,
  id: string,
  _token: string,
  _tokenExpirationDate: string
}
