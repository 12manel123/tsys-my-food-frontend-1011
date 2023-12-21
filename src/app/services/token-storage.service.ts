import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class TokenStorageService {

  /**
  * Signs out the user by clearing the session storage.
  */
  singOut(): void {
    window.sessionStorage.clear();
  }

  /**
  * Saves the authentication token in the session storage.
  *
  * @param token The authentication token to be saved.
  */
  public saveToken(token: string): void {
    window.sessionStorage.removeItem('token');
    window.sessionStorage.setItem('token', token);
  }

  /**
  * Retrieves the authentication token from the session storage.
  *
  * @return The authentication token stored in the session storage, or null if not present.
  */
  public getToken(): string | null {
    return window.sessionStorage.getItem('token');
  }

  /**
  * Saves the user information in the session storage.
  *
  * @param user The user information to be saved.
  */
  public saveUser(user: string): void {
    window.sessionStorage.removeItem('user');
    window.sessionStorage.setItem('user', user);
  }

  /**
  * Retrieves the user information from the session storage.
  *
  * @return The user information stored in the session storage, or null if not present.
  */
  public getUser(): string | null {
    return window.sessionStorage.getItem('user');
  }

  /**
  * Saves the user role in the session storage.
  *
  * @param role The user role to be saved.
  */
  public saveRole(role: string): void {
    window.sessionStorage.removeItem('role');
    window.sessionStorage.setItem('role', role);
  }

  /**
  * Retrieves the user role from the session storage.
  *
  * @return The user role stored in the session storage, or null if not present.
  */
  public getRole(): string | null {
    return window.sessionStorage.getItem('role');
  }

  /**
  * Saves the user ID in the session storage.
  *
  * @param id The user ID to be saved.
  */
  public saveId(id: string): void {
    window.sessionStorage.removeItem('id');
    window.sessionStorage.setItem('id', id);
  }

  /**
  * Retrieves the user ID from the session storage.
  *
  * @return The user ID stored in the session storage, or null if not present.
  */
  public getId(): string | null {
    return window.sessionStorage.getItem('id');
  }


}
