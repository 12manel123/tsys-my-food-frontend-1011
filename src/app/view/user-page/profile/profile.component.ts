import { Component, OnInit, inject } from '@angular/core';
import { UserDTO } from '../../../models/user';
import { ProfileUserService } from '../../../services/profile-user.service';
import { TokenStorageService } from '../../../services/token-storage.service';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [DatePipe, MatButtonModule , ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  servProfile = inject(ProfileUserService);
  servSession = inject(TokenStorageService);

  user: UserDTO = {} as UserDTO;
  idUser: string = '';

  public eamilForm: FormGroup<any> = new FormGroup<any>({


    email: new FormControl('', [
      Validators.required,
      Validators.email]),
  })


  ngOnInit(): void {

    this.idUser = this.servProfile.servSession.getId()!;
    this.getUserName();

  }


  uddateUser() {



     this.user.email = this.eamilForm.get('email')?.value,

    this.eamilForm.reset();

    this.servProfile.updateUserByID(this.idUser, this.idUser  ).subscribe(
      (data: any) => {
        this.getUserName();
      }
    );
  }

  getUserName() {
    this.servProfile.getUserByID(this.idUser).subscribe(
      (data: any) => {
        this.user = data;
      }
    );
  }

}

