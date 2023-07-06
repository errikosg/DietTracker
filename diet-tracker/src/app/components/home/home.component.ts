import { Component, OnInit } from '@angular/core';
import { faHouse, faBook, faAppleWhole } from '@fortawesome/free-solid-svg-icons';
import { MacroGoalService } from 'src/app/services/macro-goal/macro-goal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  faHouse = faHouse; faBook=faBook; faFood=faAppleWhole;

  constructor(
    private macroGoalService: MacroGoalService
  ){}

  ngOnInit(): void {
    this.macroGoalService.getMacroGoals().subscribe();
  }
}
