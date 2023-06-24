import { Component } from '@angular/core';
import { faHouse, faBook, faAppleWhole } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  faHouse = faHouse; faBook=faBook; faFood=faAppleWhole;

  constructor(
    private authService: AuthService
  ){}
}
