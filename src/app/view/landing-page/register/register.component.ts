import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserReg } from '../../../models/user';
import { LogoComponent } from '../../../shared/logo/logo.component';
import { Router} from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { TokenStorageService } from '../../../services/token-storage.service';


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

  rta: string = '';

  user: UserReg = {
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

    checkbox :  new FormControl(false, Validators.requiredTrue),

  })


  add() {
    const { username, email, password } = this.registerForm.getRawValue();
    this.registerForm.reset();

    this.authService. register(new UserReg (username, email, password) ).subscribe((result: { toString: () => string; })=>{
      if (result) {
        this.authService.login({ username, password }).subscribe((rta: { [key: string]: string }) => {
          if (rta) {
            this.rta = rta.toString();

            // Data to save in the service
            this.authService.token.set(Object.values(rta)[0]) ;
            this.authService.username.set(Object.values(rta)[2]);
            this.authService.role.set(Object.values(rta)[4])

            // Data to save in the session storage
            this.tokenStServ.saveToken(Object.values(rta)[0]);
            this.tokenStServ.saveUser(Object.values(rta)[2]);
            this.tokenStServ.saveRole(Object.values(rta)[4]);

            this.router.navigate(['/user/initial'])
          }
        })
      } else {
        alert('Error al registrar usuario\n Por favor intente nuevamente con otro nombre de usuario o correo electrónico');
      }
    })

  }

  accept() {
    this.registerForm.value.checkbox = true;
    console.log( this.registerForm.value.checkbox);
  }
}


