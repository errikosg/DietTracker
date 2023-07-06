import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { MacroGoalService } from './services/macro-goal/macro-goal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  constructor(
    private authService: AuthService,
  ){}

  ngOnInit(): void {
    this.authService.autoLogin();
  }
  
}
