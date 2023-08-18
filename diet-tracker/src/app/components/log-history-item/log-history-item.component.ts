import { AfterContentInit, Component, ContentChild, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FoodDisplayComponent } from '../food-display/food-display.component';
import { RecipeDisplayComponent } from '../recipe-display/recipe-display.component';
import { ConsumptionService } from 'src/app/services/consumption/consumption.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-log-history-item',
  templateUrl: './log-history-item.component.html',
  styleUrls: ['./log-history-item.component.css']
})
export class LogHistoryItemComponent implements AfterContentInit{
  faTrash=faTrash;
  @ContentChild(FoodDisplayComponent) foodContent;
  @ContentChild(RecipeDisplayComponent) recipeContent;
  @Input() date: Date;
  @Output() deleted = new EventEmitter<string>();
  itemId: string;
  itemType: string;

  constructor(
    private consumptionService: ConsumptionService,
    private snackBar: MatSnackBar
  ){}

  ngAfterContentInit(): void {
    if(this.foodContent){
      this.itemId = this.foodContent._id;
      this.itemType = "food"
    }
    else{
      this.itemId = this.recipeContent._id;
      this.itemType = 'recipe'
    }
  }

  onDeleteLog(){
    this.consumptionService.deleteConsumptionItem(this.itemId, this.itemType, this.date).subscribe({
      next: () => this.nextHandler()
    })
  }

  nextHandler() {
    this.deleted.emit(this.itemId)
    this.snackBar.open("Log deleted successfully", null, { duration: 1500 });
  }

  // errorHandler(err: string){
  //   this.error = err;
  // }
}
