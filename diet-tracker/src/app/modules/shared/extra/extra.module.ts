import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarCardComponent } from 'src/app/components/calendar-card/calendar-card.component';
import { CustomPasswordComponent } from 'src/app/components/custom-password/custom-password.component';
import { DateHeaderComponent } from 'src/app/components/date-header/date-header.component';
import { FontsModule } from '../fonts/fonts.module';
import { MaterialModule } from '../material/material.module';
import { DonutChartComponent } from 'src/app/components/donut-chart/donut-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  declarations: [
    DateHeaderComponent,
    CustomPasswordComponent,
    CalendarCardComponent,
    DonutChartComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FontsModule,
    NgApexchartsModule
  ],
  exports: [
    DateHeaderComponent,
    CustomPasswordComponent,
    CalendarCardComponent,
    DonutChartComponent
  ]
})
export class ExtraModule { }
