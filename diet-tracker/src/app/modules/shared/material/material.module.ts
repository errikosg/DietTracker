import { NgModule } from '@angular/core';

import {MatButtonModule} from '@angular/material/button'; 
import {MatInputModule} from '@angular/material/input'; 
import {MatMenuModule} from '@angular/material/menu'; 
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';  
import {MatProgressBarModule} from '@angular/material/progress-bar'; 
import {MatDividerModule} from '@angular/material/divider'; 
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
import {MatPaginatorModule} from '@angular/material/paginator'; 
import {MatTabsModule} from '@angular/material/tabs'; 
import {MatDialogModule} from '@angular/material/dialog'; 
import {MatSnackBarModule} from '@angular/material/snack-bar'; 
import {MatSelectModule} from '@angular/material/select'; 
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {MatNativeDateModule} from '@angular/material/core';

@NgModule({
  declarations: [],
  exports: [
    MatButtonModule,
    MatInputModule,
    MatMenuModule,
    MatSidenavModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatTabsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCardModule,
    MatNativeDateModule
  ]
})
export class MaterialModule { }
