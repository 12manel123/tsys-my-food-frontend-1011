import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { LogoComponent } from '../../../shared/logo/logo.component';
import { User } from '../../../models/user';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../../services/token-storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, LogoComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  // Injects the TokenStorageService, AuthService and Router services
  private tokenStServ = inject(TokenStorageService);
  private authService = inject(AuthService);
  private router = inject(Router);

  // User object to be used in the component
  protected user: User = {
    username: '',
    password: '',
  };

  rta: string = '';

  // Form group to be used in the component
  registerForm: FormGroup<any> = new FormGroup<any>({
    username: new FormControl('', [
      Validators.minLength(10),
      Validators.maxLength(60),
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
      Validators.pattern('^(?=.*[A-Z])(?=.*[a-zA-Z0-9]).+$'), // must contain at least one number, one uppercase and one lowercase letter
    ]),
  });

  login() {
    if (this.registerForm.valid) {
      this.user.username = this.registerForm.get('username')?.value;
      this.user.password = this.registerForm.get('password')?.value;

      const username = this.user.username;
      const password = this.user.password;

      this.authService
        .login({ username, password })
        .subscribe((rta: { [key: string]: string }) => {
          if (rta) {
            this.rta = rta.toString();

            // Data to save in the session storage
            this.tokenStServ.saveToken(Object.values(rta)[0]);
            this.tokenStServ.saveUser(Object.values(rta)[2]);
            this.tokenStServ.saveRole(Object.values(rta)[4]);
            this.tokenStServ.saveId(Object.values(rta)[3]);

            this.rediredForRole();
          }
        });
    }
  }

  private rediredForRole() {
    const role = this.tokenStServ.getRole();

    switch (role) {
      case 'ROLE_ADMIN':
        this.router.navigate(['/admin']);
        break;
      case 'ROLE_USER':
        this.router.navigate(['/user/initial']);
        break;
      case 'ROLE_CHEF':
        console.log('chef');
        this.router.navigate(['/chef']);
        break;
      default:
        this.router.navigate(['/user/initial']);
        break;
    }
  }

  sendPageRegiter() {
    this.router.navigate(['/register']);
  }
}
