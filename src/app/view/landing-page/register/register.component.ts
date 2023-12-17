import { Component, inject } from '@angular/core';
import {  FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserReg } from '../../../models/user';
import { LogoComponent } from '../../../shared/logo/logo.component';
import { Router} from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { TokenStorageService } from '../../../services/token-storage.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ ReactiveFormsModule, LogoComponent ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  private authService  = inject(AuthService)
  private tokenStServ = inject(TokenStorageService)
  private router= inject(Router) ;

  protected user: UserReg = {
    username: '',
    email: '',
    password: '',
  };


  public registerForm: FormGroup<any> = new FormGroup<any>({

    username: new FormControl('',[
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(60),]),

    email: new FormControl('', [
      Validators.required,
      Validators.email,
     Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8) && Validators.maxLength(20),
      Validators.pattern('^(?=.*[A-Z])(?=.*[a-zA-Z0-9]).+$'),
    ]),

    confirmPassword: new FormControl('', [ Validators.required,
      Validators.minLength(8) && Validators.maxLength(20),
      Validators.pattern('^(?=.*[A-Z])(?=.*[a-zA-Z0-9]).+$'),
    ]),

    checkbox :  new FormControl(false, Validators.requiredTrue),

  })

  passwordMatchValidator() {
    return  this.registerForm.get('password')?.value ===  this.registerForm.get('confirmPassword')?.value
  }


  add() {

    // Check if the passwords match
    if (!this.passwordMatchValidator()) {
      Swal.fire({
        icon: 'error',
        text: 'Passwords do not match!',
      })
      return;
    }

    // Check if the form is valid
    let timerInterval: any
    Swal.fire({
      title: ' Loading data!',
      html: 'I will close in <b></b> milliseconds.',
      timer: 1200,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer()?.querySelector('b')
        timerInterval = setInterval(() => {
          if (b) {
            b.textContent = String(Swal.getTimerLeft());
          }
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {

      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    })

    const { username, email, password } = this.registerForm.getRawValue();
    this.registerForm.reset();

    this.authService. register(new UserReg (username, email, password) ).subscribe((result: { toString: () => string; })=>{
      if (result) {
        this.authService.login({ username, password }).subscribe((res: { [key: string]: string }) => {
          if (res) {

            // Data to save in the session storage
            this.tokenStServ.saveToken(Object.values(res)[0]);
            this.tokenStServ.saveUser(Object.values(res)[2]);
            this.tokenStServ.saveRole(Object.values(res)[4]);
            this.tokenStServ.saveId(Object.values(res)[3]);

            this.router.navigate(['/user/initial'])
          }
        })
      }
    })

  }

  accept() {
    this.registerForm.value.checkbox = true;
  }
}


