import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogHistoryItemComponent } from 'src/app/components/log-history-item/log-history-item.component';
import { LogHistoryComponent } from 'src/app/components/log-history/log-history.component';
import { FontsModule } from '../shared/fonts/fonts.module';
import { MaterialModule } from '../shared/material/material.module';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/services/auth-guard/auth-guard.service';
import { FoodModule } from '../shared/food/food.module';
import { ExtraModule } from '../shared/extra/extra.module';
import { MacroModule } from '../shared/macro/macro.module';

const routes: Routes = [
  { path: '', component: LogHistoryComponent, canActivate: [AuthGuardService] }
]

@NgModule({
  declarations: [
    LogHistoryComponent,
    LogHistoryItemComponent
  ],
  imports: [
    CommonModule,
    FontsModule,
    MaterialModule,
    FoodModule,
    ExtraModule,
    MacroModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    LogHistoryComponent,
    LogHistoryItemComponent
  ]
})
export class LogHistoryModule { }
