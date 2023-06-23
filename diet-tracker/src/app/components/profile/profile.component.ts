import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, take } from 'rxjs/operators';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  currentUser: User = null;
  nameForm: FormGroup;
  emailForm: FormGroup;
  passwordForm: FormGroup;

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // get current user
    this.authService.currentUser$.pipe(
      take(1),
      map(user => {
        this.currentUser = user
      })
    ).subscribe()
  }
}
