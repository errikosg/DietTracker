import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faTrash, faPen, faPhotoFilm } from '@fortawesome/free-solid-svg-icons';
import { Food } from 'src/app/models/Food';


@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css']
})
export class IngredientComponent implements OnInit{
  @Input() food: Food;
  @Input() index: number;
  @Output() deleted:EventEmitter<number> = new EventEmitter<number>();
  faTrash=faTrash; faPen=faPen; faPhoto=faPhotoFilm;

  constructor(
  ) {}

  ngOnInit(): void {
  }  

  onDeleteFood() {
    this.deleted.emit(this.index)
  }
}
