import { Component, OnInit } from '@angular/core';
import { Consumptions } from 'src/app/models/Consumption';
import { ConsumptionService } from 'src/app/services/consumption/consumption.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-log-history',
  templateUrl: './log-history.component.html',
  styleUrls: ['./log-history.component.css']
})
export class LogHistoryComponent implements OnInit{
  userConsumptions: Consumptions[] = [];
  isLoading: boolean = true;
  checkedDates: Date[] = [];
  loadedDay:Consumptions = null;
  selectedDate: Date | null = new Date();

  constructor(
    private consumptionService: ConsumptionService
  ){}

  ngOnInit(): void {
    this.consumptionService.getAllConsumptions().subscribe(cons => {
      if(cons.length > 0){
        this.userConsumptions = cons

        // add days with logs
        for(let c of cons){
          this.checkedDates.push(new Date(c.date))
        }
        // load today's consumption if exists
        this.loadedDay = cons.find(item => this.areDatesSameDay(new Date(item.date), this.selectedDate))
      }
      this.isLoading = false;
    })
  }

  onDateSelected(date: Date) {
    this.selectedDate = date;
    // load selected date's consumption
    this.loadedDay = this.userConsumptions.find(item => this.areDatesSameDay(new Date(item.date), this.selectedDate))
  }

  // helper
  areDatesSameDay(date1: Date, date2: Date) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }
}
