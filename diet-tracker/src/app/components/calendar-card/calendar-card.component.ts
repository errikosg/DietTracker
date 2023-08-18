import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';

@Component({
  selector: 'app-calendar-card',
  templateUrl: './calendar-card.component.html',
  styleUrls: ['./calendar-card.component.css']
})
export class CalendarCardComponent {
  @Input() selectedDate: Date | null;
  @Input() checkedDates: Date[];
  @Output() select = new EventEmitter<Date>();

  onSelect(){
    this.select.emit(this.selectedDate)
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month' && this.checkedDates) {
      const year = cellDate.getFullYear()
      const month = cellDate.getMonth();
      const date = cellDate.getDate();

      // Highlight the 1st and 20th day of each month.
      return this.isDayIncluded(this.checkedDates, date, month, year) ? 'date-checked' : '';
    }
    return '';
  };

  isDayIncluded(dateArray: Date[], day: number, month:number, year:number) {
    return dateArray.some(item => item.getDate() === day && item.getMonth() === month && item.getFullYear() === year);
  }
}
