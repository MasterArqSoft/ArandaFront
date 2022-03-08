import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginModel } from '../modules/account/models/login-model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  login(login: LoginModel) {
    return this.http.post(`${environment.urlApi}account/login`, login);
  }

  refreshToken() {
    return this.http.post(`${environment.urlApi}account/renovarToken`, null);
  }

  getToken(): string | null {
    return localStorage.getItem(environment.token);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(environment.refreshToken);
  }

  getRole(): string | null {
    return localStorage.getItem(environment.role);
  }

  isAuthenticated(): boolean {
    return Boolean(this.getToken());
  }
  isRole(): boolean {
    return Boolean(this.getRole());
  }

  public saveTokens(accessToken: string): void {
    localStorage.setItem(environment.token, accessToken);
    localStorage.setItem(environment.refreshToken, accessToken); //refreshToken
    //localStorage.setItem(environment.role, loginResponse.role);
    //this.router.navigateByUrl('/');
  }

  public refreshTokens(refreshTokenResponse: string): void {
    localStorage.setItem(environment.token, refreshTokenResponse);
    localStorage.setItem(environment.refreshToken, refreshTokenResponse);
  }

  removeTokens(): void {
    localStorage.removeItem(environment.token);
    localStorage.removeItem(environment.refreshToken);
  }

  removeAccess() {
    localStorage.removeItem(environment.role);
  }

  logout() {
    this.removeTokens();
    this.removeAccess();
    // this.router.navigateByUrl('/login');
    // this.router.navigate(['admon/login']);
    // this.storeService.user = null;
  }
}
