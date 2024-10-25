import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { iAccessData } from '../interfaces/i-access-data';
import { iUser } from '../interfaces/i-user';
import { iLoginRequest } from '../interfaces/i-login-request';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jwtHelper: JwtHelperService = new JwtHelperService();

  registerUrl: string = environment.registerUrl;
  loginUrl: string = environment.loginUrl;
  usersUrls: string = environment.usersUrl;

  authSubject$ = new BehaviorSubject<iAccessData | null>(null);

  user$ = this.authSubject$.asObservable().pipe(
    tap((accessData) => (this.isLoggedIn = !!accessData)),
    map((accessData) => {
      return accessData ? accessData.user : null;
    })
  );

  isLoggedIn$ = this.authSubject$
    .asObservable()
    .pipe(map((accessData) => !!accessData));

  isLoggedIn: boolean = false;

  autoLogoutTimer: any;

  constructor(private http: HttpClient, private router: Router) {
    this.restoreUser();
  }

  register(newUser: Partial<iUser>) {
    return this.http.post<iAccessData>(this.registerUrl, newUser);
  }

  login(authData: iLoginRequest) {
    return this.http.post<iAccessData>(this.loginUrl, authData).pipe(
      tap((accessData) => {
        this.authSubject$.next(accessData);
        localStorage.setItem('accessData', JSON.stringify(accessData));

        const expDate: Date | null = this.jwtHelper.getTokenExpirationDate(
          accessData.accessToken
        );

        if (!expDate) return;

        this.autoLogout(expDate);
      })
    );
  }

  logout() {
    this.authSubject$.next(null);
    localStorage.removeItem('accessData');
    this.router.navigate(['/auth/login']);
  }

  autoLogout(expDate: Date) {
    const expMs = expDate.getTime() - new Date().getTime();

    this.autoLogoutTimer = setTimeout(() => {
      this.logout();
    }, expMs);
  }

  restoreUser() {
    const userJson: string | null = localStorage.getItem('accessData');
    if (!userJson) return;

    const accessData: iAccessData = JSON.parse(userJson);
    if (this.jwtHelper.isTokenExpired(accessData.accessToken)) {
      localStorage.removeItem('accessData');
      return;
    }

    this.authSubject$.next(accessData);
  }

  getAllUsers(): Observable<iUser[]> {
    return this.http.get<iUser[]>(this.usersUrls);
  }
}
