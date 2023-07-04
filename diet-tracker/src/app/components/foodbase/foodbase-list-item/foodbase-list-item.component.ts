import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Food } from 'src/app/models/Food';
import { faPhotoFilm, faDotCircle } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-foodbase-list-item',
  templateUrl: './foodbase-list-item.component.html',
  styleUrls: ['./foodbase-list-item.component.css']
})
export class FoodBaseListItemComponent{
  @Input() food: Food;
  panelOpenState: boolean = false;
  faPhoto = faPhotoFilm; faDotCircle=faDotCircle
}
