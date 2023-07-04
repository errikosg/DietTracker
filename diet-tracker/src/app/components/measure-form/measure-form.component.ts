import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-measure-form',
  templateUrl: './measure-form.component.html',
  styleUrls: ['./measure-form.component.css']
})
export class MeasureFormComponent {
  measures = [
    {value: 'gram', viewValue:'g'},
    {value: 'ounce', viewValue: 'oz'},
    {value: 'pound', viewValue: 'lbs'},
    {value: 'kilo', viewValue: 'kg'}
  ]
  selectedMeasure = this.measures[0].value;
  inputWeight: number = 0;
  @Output() weight:EventEmitter<number> = new EventEmitter<number>();

  onInput() {
    this.weight.emit(this.calculateMeasure())
  }

  onSelect() {
    this.weight.emit(this.calculateMeasure())
  }

  calculateMeasure(): number {
    switch (this.selectedMeasure) {
      case 'ounce':
        return this.inputWeight*28.35;
      case 'pound':
        return this.inputWeight*453.6;
      case 'kilo':
        return this.inputWeight*1000;
      default:
        return this.inputWeight;
    }
  }
}
