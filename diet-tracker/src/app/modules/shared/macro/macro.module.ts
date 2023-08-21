import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MacroDisplayComponent } from 'src/app/components/macro-display/macro-display.component';
import { PercentBarComponent } from 'src/app/components/percent-bar/percent-bar.component';
import { MaterialModule } from '../material/material.module';
import { FontsModule } from '../fonts/fonts.module';



@NgModule({
  declarations: [
    MacroDisplayComponent,
    PercentBarComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FontsModule
  ],
  exports: [
    MacroDisplayComponent,
    PercentBarComponent
  ]
})
export class MacroModule { }
