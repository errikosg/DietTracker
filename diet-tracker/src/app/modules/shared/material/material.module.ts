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
    MatPaginatorModule
  ]
})
export class MaterialModule { }
