import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {


  constructor() { }

  singOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem('token');
    window.sessionStorage.setItem('token', token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem('token');
  }

  public saveUser(user: string): void {
    window.sessionStorage.removeItem('user');
    window.sessionStorage.setItem('user', user);
  }

  public getUser(): string | null {
    return window.sessionStorage.getItem('user');
  }

  public saveRole(role: string): void {
    window.sessionStorage.removeItem('role');
    window.sessionStorage.setItem('role', role);
  }

  public getRole(): string | null {
    return window.sessionStorage.getItem('role');
  }


}
