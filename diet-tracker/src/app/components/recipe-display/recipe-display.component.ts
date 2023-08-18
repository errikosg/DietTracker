import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-recipe-display',
  templateUrl: './recipe-display.component.html',
  styleUrls: ['./recipe-display.component.css']
})
export class RecipeDisplayComponent {
  @Input() name: string;
  @Input() calories: number;
  @Input() ingredients: number;
  @Input() _id: string; //for content
}
