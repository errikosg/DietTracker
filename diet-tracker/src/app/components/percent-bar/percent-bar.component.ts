import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-percent-bar',
  templateUrl: './percent-bar.component.html',
  styleUrls: ['./percent-bar.component.css']
})
export class PercentBarComponent {
  @Input() macroPercentage: number;
  @Input() macroName: string;
  @Input() colorClass: string;

}
