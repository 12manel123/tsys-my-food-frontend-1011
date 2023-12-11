import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  http = inject(HttpClient);

  urlProd = 'https://myfood.up.railway.app/auth/register';

  registerUser(): Observable<any> {

    const userData = {
      email: 'test8@hotmail.com',
      password: '12345678',
      username: 'test8',
    };
    return this.http.post(`${this.urlProd}`, userData);
  }

  ngOnInit(): void {

    this.registerUser().subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
