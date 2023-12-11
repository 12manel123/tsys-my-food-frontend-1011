import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { LogoComponent } from '../../../shared/logo/logo.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports:  [ ReactiveFormsModule, LogoComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {


  rta: any;
  stylebtn: any;
  registerForm: any;



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

  add() {
    throw new Error('Method not implemented.');
  }

  btnValited() {
    throw new Error('Method not implemented.');
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
