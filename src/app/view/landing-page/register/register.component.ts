import { Component, inject  } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserReg } from '../../../models/user';
import { RegisterService } from '../../../services/register.service';
import { LogoComponent } from '../../../shared/logo/logo.component';
import { LoginService } from '../../../services/login.service';
import { Router} from '@angular/router';


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
  private registerService = inject(RegisterService)
  private loginService = inject(LoginService)
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

    this.registerService. addNewUser(new UserReg (username, email, password) ).subscribe((result: { toString: () => string; })=>{
      if (result) {
        this.loginService.loginUser({ username, password }).subscribe((rta: { toString: () => string; }) => {
          if (rta) {
            this.rta = rta.toString();
            console.log(result);

            alert("Usuario " + username + " creado con exito ");

            console.log(rta);
            this.router.navigate(['/user'])
          }
         })
      }
    })

    }
}


