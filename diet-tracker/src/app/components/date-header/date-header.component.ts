import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-date-header',
  templateUrl: './date-header.component.html',
  styleUrls: ['./date-header.component.css']
})
export class DateHeaderComponent{
  @Input() date: Date = new Date();
}
