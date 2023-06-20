import { NgModule } from '@angular/core';

import {MatButtonModule} from '@angular/material/button'; 
import {MatInputModule} from '@angular/material/input'; 
import {MatMenuModule} from '@angular/material/menu'; 
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';  
import {MatProgressBarModule} from '@angular/material/progress-bar'; 
import {MatDividerModule} from '@angular/material/divider'; 

@NgModule({
  declarations: [],
  exports: [
    MatButtonModule,
    MatInputModule,
    MatMenuModule,
    MatSidenavModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatDividerModule
  ]
})
export class MaterialModule { }
