import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}
@Injectable({
  providedIn: 'root'
})
export class UserDbService {
  private users: User[] = [
    { id: 1, username: 'user1', email: 'user1@example.com', role: 'user' },
    { id: 2, username: 'user2', email: 'user2@example.com', role: 'admin' },
  ];

  getUsers(): Observable<User[]> {
    return of(this.users);
  }

  deleteUser(userId: number): Observable<void> {
    const index = this.users.findIndex(user => user.id === userId);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
    return of();
  }

  updateRole(userId: number): Observable<void> {
    const index = this.users.findIndex(user => user.id === userId);

    if (index !== -1) {
      const newRole = prompt('Ingrese el nuevo rol (user, admin, chef):');
      
      if (newRole && ['user', 'admin', 'chef'].includes(newRole.toLowerCase())) {
        this.users[index].role = newRole.toLowerCase();
      } else {
        alert('Rol inválido. Se requiere "user", "admin" o "chef".');
      }
    }

    return of();
  }
  constructor() { }
}
