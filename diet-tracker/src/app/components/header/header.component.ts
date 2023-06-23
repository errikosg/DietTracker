import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, map, take } from 'rxjs';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  title: string = "DIET TRACKER"
  currentUser: User = null;
  faUser = faUser;
  subscription: Subscription;

  constructor(
    private authService: AuthService,
  ){}

  ngOnInit(): void {
    // get previous value
    this.authService.currentUser$.pipe(
      take(1),
      map(user => {
        this.currentUser = user
      })
    ).subscribe()

    // setup subscription
    this.subscription = this.authService.currentUser$.subscribe(user => {
      this.currentUser = user
    })
  }

  onLogout() {
    this.authService.logout()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
