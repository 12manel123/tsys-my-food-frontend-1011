import { Component  } from '@angular/core';
import { ReactiveFormsModule , FormGroup} from '@angular/forms';
import { LogoComponent } from '../../../shared/logo/logo.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports:  [ ReactiveFormsModule, LogoComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
registerForm: FormGroup<any> = new FormGroup({});
stylebtn: any;
rta: any;

  add() {
    throw new Error('Method not implemented.');
  }

  btnValited() {
    throw new Error('Method not implemented.');
    }

  ngOnInit(): void {

  }
}
