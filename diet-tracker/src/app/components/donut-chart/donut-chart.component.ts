import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ApexNonAxisChartSeries, ApexChart, ApexResponsive } from 'ng-apexcharts';
import { Subscription, skip } from 'rxjs';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  colors: any[];
};

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.css']
})
export class DonutChartComponent implements OnInit{
  @ViewChild("chart") chart: DonutChartComponent;
  public chartOptions: Partial<ChartOptions>;

  @Input() macroValue: number;
  @Input() macroGoalValue: number;
  @Input() macroName: string;
  subscription: Subscription

  constructor(
  ) {}

  ngOnInit(): void {
    // setup chart
    // const remaining = (this.macroGoalValue-this.macroValue)>0 ? (this.macroGoalValue-this.macroValue) : 0
    this.chartOptions = {
      series: [+this.macroValue, +(this.macroGoalValue-this.macroValue)],
      colors: [this.getColorType(this.macroName), '#dddddd'],
      chart: {
        type: "donut"
      },
      labels: [this.macroName, "Remaining"],
      responsive: [
        {
          options: {
            chart: {
              width: 500
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  getColorType(macroName: string) {
    switch(macroName){
      case "Protein":
        return  "var(--protein-color)";
      case "Fat":
        return "var(--fat-color)"; break;
      case "Carbs":
        return "var(--carbs-color)"; break;
      default:
        return "var(--calories-color)"
    }
  }

}
