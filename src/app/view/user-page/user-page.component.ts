import { Component} from '@angular/core';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderUserComponent } from './header-user/header-user.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [FooterComponent,HeaderUserComponent, RouterOutlet],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent  {

}
