import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserDTO } from '../models/user';

export interface UserforAdmin {
  id: number;
  username: string;
  email: string;
  role: string;
}
@Injectable({
  providedIn: 'root'
})
export class UserDbService {
  private users: UserforAdmin[] = [
    { id: 1, username: 'user1', email: 'user1@example.com', role: 'user' },
    { id: 2, username: 'user2', email: 'user2@example.com', role: 'admin' },
    { id: 3, username: 'user3', email: 'user3@example.com', role: 'user' },
    { id: 4, username: 'user4', email: 'user4@example.com', role: 'chef' },
    { id: 5, username: 'user5', email: 'user5@example.com', role: 'admin' },
    { id: 6, username: 'user6', email: 'user6@example.com', role: 'user' },
    { id: 7, username: 'user7', email: 'user7@example.com', role: 'admin' },
    { id: 8, username: 'user8', email: 'user8@example.com', role: 'chef' },
    { id: 9, username: 'user9', email: 'user9@example.com', role: 'user' },
    { id: 10, username: 'user10', email: 'user10@example.com', role: 'admin' },
    { id: 11, username: 'user11', email: 'user11@example.com', role: 'user' },
    { id: 12, username: 'user12', email: 'user12@example.com', role: 'chef' },
    { id: 13, username: 'user13', email: 'user13@example.com', role: 'admin' },
    { id: 14, username: 'user14', email: 'user14@example.com', role: 'user' },
    { id: 15, username: 'user15', email: 'user15@example.com', role: 'admin' },
    { id: 16, username: 'user16', email: 'user16@example.com', role: 'chef' },
    { id: 17, username: 'user17', email: 'user17@example.com', role: 'user' },
    { id: 18, username: 'user18', email: 'user18@example.com', role: 'admin' },
    { id: 19, username: 'user19', email: 'user19@example.com', role: 'user' },
    { id: 20, username: 'user20', email: 'user20@example.com', role: 'chef' },
    { id: 21, username: 'user21', email: 'user21@example.com', role: 'admin' },
    { id: 22, username: 'user22', email: 'user22@example.com', role: 'user' },
    { id: 23, username: 'user23', email: 'user23@example.com', role: 'admin' },
    { id: 24, username: 'user24', email: 'user24@example.com', role: 'chef' },
    { id: 25, username: 'user25', email: 'user25@example.com', role: 'user' },
    { id: 26, username: 'user26', email: 'user26@example.com', role: 'admin' },
    { id: 27, username: 'user27', email: 'user27@example.com', role: 'user' },
    { id: 28, username: 'user28', email: 'user28@example.com', role: 'chef' },
    { id: 29, username: 'user29', email: 'user29@example.com', role: 'admin' },
    { id: 30, username: 'user30', email: 'user30@example.com', role: 'user' },
    { id: 31, username: 'user31', email: 'user31@example.com', role: 'admin' },
    { id: 32, username: 'user32', email: 'user32@example.com', role: 'chef' },
    { id: 33, username: 'user33', email: 'user33@example.com', role: 'user' },
    { id: 34, username: 'user34', email: 'user34@example.com', role: 'admin' },
    { id: 35, username: 'user35', email: 'user35@example.com', role: 'user' },
    { id: 36, username: 'user36', email: 'user36@example.com', role: 'chef' },
    { id: 37, username: 'user37', email: 'user37@example.com', role: 'admin' },
    { id: 38, username: 'user38', email: 'user38@example.com', role: 'user' },
    { id: 39, username: 'user39', email: 'user39@example.com', role: 'admin' },
    { id: 40, username: 'user40', email: 'user40@example.com', role: 'chef' },
    { id: 41, username: 'user41', email: 'user41@example.com', role: 'user' },
    { id: 42, username: 'user42', email: 'user42@example.com', role: 'admin' },
  ];

  private url = environment.apiUrl + '/api/v1/users';
  private url2 = environment.apiUrl + '/api/v1/user';
  private http = inject(HttpClient)

  private usersApi: UserforAdmin[] = []

  private userSubject = new BehaviorSubject<UserforAdmin[]>(this.usersApi);
  
  getUsers(num1:number,num2:number): Observable<UserforAdmin[]> {
    return this.http.get<any[]>(this.url+"?page="+num1+"&size="+num2);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete<any[]>(this.url2+"/"+userId);

  }

  updateUser(userId: number,user: UserDTO): Observable<any> {
    let roleId:number=1;
    const newRole = prompt('Ingrese el nuevo rol (user, admin, chef):');
      if (newRole && ['USER', 'ADMIN', 'CHEF'].includes(newRole.toLocaleUpperCase())) {
        if(newRole.toLocaleUpperCase() == 'USER') {
          roleId =3;
        }
        else if(newRole.toLocaleUpperCase() == 'CHEF'){
          roleId=2;
        }
        else if(newRole.toLocaleUpperCase() == 'ADMIN'){
          roleId=1;
        }
        user.role.name=newRole.toLocaleUpperCase();
        user.role.id=roleId;
        return this.http.put(this.url2+"/"+userId,user, { headers: { 'Content-Type': 'application/json' } });
      } else {
        alert('Rol inválido. Se requiere "user", "admin" o "chef".');
        return of();
      }
  }

  getTotalUsersCount(): number {
    return this.usersApi.length;
  }

  constructor() { }
}
