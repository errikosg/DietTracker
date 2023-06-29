import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Food } from 'src/app/models/Food';
import { faPhotoFilm, faDotCircle } from '@fortawesome/free-solid-svg-icons';
import { MacroGoals } from 'src/app/models/MacroGoals';
import { MacroGoalService } from 'src/app/services/macro-goal/macro-goal.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-food-list-item',
  templateUrl: './foodlist-item.component.html',
  styleUrls: ['./foodlist-item.component.css']
})
export class FoodListItemComponent implements OnInit{
  @Input() food: Food;
  panelOpenState: boolean = false;
  faPhoto = faPhotoFilm; faDotCircle=faDotCircle

  ngOnInit(): void {
  }
}
