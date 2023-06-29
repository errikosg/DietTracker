import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Food } from 'src/app/models/Food';
import { faPhotoFilm, faDotCircle } from '@fortawesome/free-solid-svg-icons';
import { MacroGoals } from 'src/app/models/MacroGoals';
import { MacroGoalService } from 'src/app/services/macro-goal/macro-goal.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-foodbase-list-item',
  templateUrl: './foodbase-list-item.component.html',
  styleUrls: ['./foodbase-list-item.component.css']
})
export class FoodBaseListItemComponent implements OnInit{
  @Input() food: Food;
  panelOpenState: boolean = false;
  faPhoto = faPhotoFilm; faDotCircle=faDotCircle

  ngOnInit(): void {
  }
}
