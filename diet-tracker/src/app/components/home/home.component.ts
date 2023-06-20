import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { faHouse, faBook, faAppleWhole } from '@fortawesome/free-solid-svg-icons';

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
