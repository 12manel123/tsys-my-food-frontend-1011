import { Component, inject  } from '@angular/core';
import { ReactiveFormsModule , FormGroup, Validators, FormControl} from '@angular/forms';
import { LogoComponent } from '../../../shared/logo/logo.component';
import { User } from '../../../models/user';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../../services/token-storage.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports:  [ ReactiveFormsModule, LogoComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {


  private tokenStServ = inject(TokenStorageService);
  private authService = inject(AuthService);
  private router= inject(Router) ;

    user: User = {
      username: '',
      password: '',
    };

    registerForm: FormGroup<any> = new FormGroup<any>({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });


  stylebtn = 'btn btn-secondary btn-sm mt-4';
  rta: string = "";



  login() {

    if (this.registerForm.valid) {

      this.stylebtn = 'btn btn-success btn-sm mt-4';

      this.user.username = this.registerForm.get('username')?.value;
      this.user.password = this.registerForm.get('password')?.value;

      const username = this.user.username;
      const password = this.user.password;

      this.authService.login({ username, password }).subscribe((rta: { [key: string]: string; }) => {

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


          this.rediredForRole ()
        }
      })

    }
  }

  private rediredForRole () {

    const role =  this.authService.role().toString();
    console.log(role);

     switch (role) {
       case 'ROLE_ADMIN':
         this.router.navigate(['/admin'])
         break;
       case 'ROLE_USER':
         this.router.navigate(['/user/initial'])
         break;
       case 'ROLE_CHEF':
         console.log('chef');
           this.router.navigate(['/chef'])
           break;
       default:
         this.router.navigate(['/user/initial'])
         break;
      }

   }

}
