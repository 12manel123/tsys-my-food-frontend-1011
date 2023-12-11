import { Component  } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserReg } from '../../../models/user';
import { RegisterService } from '../../../services/register.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {


  rta: string = '';
  stylebtn: String = '';

  user: UserReg[] = [];
  public registerForm: FormGroup;


  constructor(
     private registerService: RegisterService,
     private fb: FormBuilder,


  ) {


    this.registerForm = this.fb.group({

      username: '',
      email: '',
      password: '',

    })
  }

  ngOnInit(): void {

    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.minLength(8) && Validators.maxLength(20)],
      password2: ['', Validators.minLength(8) && Validators.maxLength(20)],

    })

  };

  btnValited(): void {
    this.stylebtn = 'btn btn-secondary btn-sm'
    if (this.registerForm.valid) {
      this.stylebtn = 'btn btn-success btn-sm';
    }
  }

  add() {
    throw new Error('Method not implemented.');
    }


  // add(): void {
  //   const { username, email, password } = this.registerForm.getRawValue();
  //   this.registerForm.reset();
  //   this.registerService.addNewUser(username, email, password).subscribe((result: { toString: () => string; })=>{
  //     if (result) {
  //       this.rta = result.toString();
  //       console.log(result);
  //     }
  //   })
  // }

}
