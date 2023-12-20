import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserDTO } from '../models/user';
import Swal from 'sweetalert2';

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
  

  private url = environment.apiUrl + '/api/v1/users';
  private url2 = environment.apiUrl + '/api/v1/user';

  private usersApi: UserforAdmin[] = []

  private userSubject = new BehaviorSubject<UserforAdmin[]>(this.usersApi);
  
  constructor(private http: HttpClient) { }

  getUsers(num1:number,num2:number): Observable<UserforAdmin[]> {
    return this.http.get<any[]>(this.url+"?page="+num1+"&size="+num2);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete<any[]>(this.url2+"/"+userId);

  }

  updateUser(userId: number, user: UserDTO): Observable<any> {
    return new Observable((observer) => {
      const inputOptions = {
        "admin": "Admin",
        "chef": "Chef",
        "user": "User"
      };
  
      Swal.fire({
        title: "Select role",
        input: "select",
        inputOptions,
        inputPlaceholder: "Select a role",
        showCancelButton: true,
        inputValidator: (value) => {
          return new Promise((resolve) => {
            if (value && ['admin', 'chef', 'user'].includes(value)) {
              resolve();
            } else {
              resolve("Invalid role. Please select a valid role.");
            }
          });
        }
      }).then((result) => {
        if (result.isConfirmed) {
          const selectedRole = result.value;
          let roleId: number;
  
          switch (selectedRole) {
            case 'user':
              roleId = 3;
              break;
            case 'chef':
              roleId = 2;
              break;
            case 'admin':
              roleId = 1;
              break;
            default:
              roleId = 1;
          }
  
          user.role.name = selectedRole.toUpperCase();
          user.role.id = roleId;
  
          this.http.put(this.url2 + "/" + userId, user, { headers: { 'Content-Type': 'application/json' } })
            .subscribe(
              () => {
                observer.next();
                observer.complete();
              }
            );
        } else {
          observer.complete();
        }
      });
    });
  }

  getTotalUsersCount(): number {
    return this.usersApi.length;
  }

}
