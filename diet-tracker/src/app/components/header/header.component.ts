import { Component, OnInit } from '@angular/core';
import { map, take } from 'rxjs';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  title: string = "DIET TRACKER"
  currentUser: User = null;
  faUser = faUser;

  constructor(
    private authService: AuthService,
  ){}

  ngOnInit(): void {
    this.authService.currentUser$.pipe(
      take(1),
      map(user => {
        this.currentUser = user
      })
    ).subscribe()
  }

  onLogout() {
    this.authService.logout()
  }
}
