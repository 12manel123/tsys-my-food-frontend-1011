import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LogoCardComponent } from '../../../shared/logo-card/logo-card.component';
import { AuthService } from '../../../services/auth.service';
import { TokenStorageService } from '../../../services/token-storage.service';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header-user',
  standalone: true,
  imports: [RouterLink,LogoCardComponent, MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: './header-user.component.html',
  styleUrl: './header-user.component.css'
})
export class HeaderUserComponent implements OnInit {

  tokerServ = inject(TokenStorageService);

  singOut() {
    this.tokerServ.singOut();
    window.location.reload();
}

  ngOnInit(): void {
    this.username = this.tokenStServ.getUser(); ;
  }

  private tokenStServ = inject(TokenStorageService);
  servAuth = inject(AuthService)
  username: string | null = '';


  isAdmin(): boolean {
    return 'ROLE_ADMIN' === this.tokenStServ.getRole();
  }


}
