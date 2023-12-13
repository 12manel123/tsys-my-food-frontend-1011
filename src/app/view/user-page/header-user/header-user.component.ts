import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LogoCardComponent } from '../../../shared/logo-card/logo-card.component';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-header-user',
  standalone: true,
  imports: [RouterLink,LogoCardComponent],
  templateUrl: './header-user.component.html',
  styleUrl: './header-user.component.css'
})
export class HeaderUserComponent {

  servAuth = inject(AuthService)
  username:string = this.servAuth.username();
}
