import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LogoComponent } from '../../../shared/logo/logo.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink ,LogoComponent ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
