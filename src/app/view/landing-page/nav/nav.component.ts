import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LogoCardComponent } from '../../../shared/logo-card/logo-card.component';
import { TokenStorageService } from '../../../services/token-storage.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, LogoCardComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {


}
