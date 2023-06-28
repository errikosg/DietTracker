import { Component, Input } from '@angular/core';
import { faDotCircle } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-macro-display',
  templateUrl: './macro-display.component.html',
  styleUrls: ['./macro-display.component.css']
})
export class MacroDisplayComponent {
  @Input() macroText: string;
  @Input() macroValue: number;
  @Input() color: string;
  faDotCircle=faDotCircle

  setColor() {
    return `var(${this.color})`
  }
}
