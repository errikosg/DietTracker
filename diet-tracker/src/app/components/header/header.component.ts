import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  title: string = "DIET TRACKER"

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  onLogout() {
    this.authService.logout()
  }
}
