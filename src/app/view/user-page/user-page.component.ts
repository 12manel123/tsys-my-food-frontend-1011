import { Component} from '@angular/core';
import { FooterComponent } from '../../shared/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { HeaderUserComponent } from './header-user/header-user.component';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [FooterComponent,RouterOutlet,HeaderUserComponent],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent  {

}
