import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LogoCardComponent } from '../../../shared/logo-card/logo-card.component';
import { AuthService } from '../../../services/auth.service';
import { TokenStorageService } from '../../../services/token-storage.service';


@Component({
  selector: 'app-header-user',
  standalone: true,
  imports: [RouterLink,LogoCardComponent],
  templateUrl: './header-user.component.html',
  styleUrl: './header-user.component.css'
})
export class HeaderUserComponent implements OnInit {
  ngOnInit(): void {

    this.username = this.tokenStServ.getUser(); ;

     console.log(this.username);
  }

  private tokenStServ = inject(TokenStorageService);
  servAuth = inject(AuthService)
  username: string | null = '';


}
