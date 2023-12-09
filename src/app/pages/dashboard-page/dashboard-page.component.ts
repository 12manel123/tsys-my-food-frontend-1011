import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [RouterLink,RouterOutlet],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css'
})
export class DashboardPageComponent {
  constructor(private router: Router) {}
  logOut() {
    this.router.navigate(['/']);
  }
}
