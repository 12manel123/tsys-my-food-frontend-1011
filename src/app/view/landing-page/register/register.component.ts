import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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

  rta: string = '';
  stylebtn: String = '';

  user: UserReg = {
    username: '',
    email: '',
    password: '',
  };



  public registerForm: FormGroup;

  private fb = inject(FormBuilder)
  private authService  = inject(AuthService)
  private tokenStServ = inject(TokenStorageService)
  private router= inject(Router) ;
  constructor( ) {

    this.registerForm = this.fb.group({
      username: '',
      email: '',
      password: '',
    })

  }


  ngOnInit(): void {

    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.email ,  Validators.required],
      password: ['', Validators.minLength(8) && Validators.maxLength(20), Validators.required],
    })

  };

  btnValited(): void {
    this.stylebtn = 'btn btn-secondary btn-sm mt-4'
    if (this.registerForm.valid) {
      this.stylebtn = 'btn btn-success btn-sm mt-4';
    }
  }

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
}


