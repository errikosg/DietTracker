import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-food-display',
  templateUrl: './food-display.component.html',
  styleUrls: ['./food-display.component.css']
})
export class FoodDisplayComponent {
  @Input() label: string;
  @Input() image: string;
  @Input() calories: string;
  @Input() weight: string;
  @Input() _id: string; //for content
}
