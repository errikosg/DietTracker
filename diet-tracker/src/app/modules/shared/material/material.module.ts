import { NgModule } from '@angular/core';

import {MatButtonModule} from '@angular/material/button'; 
import {MatInputModule} from '@angular/material/input'; 
import {MatMenuModule} from '@angular/material/menu'; 

@NgModule({
  declarations: [],
  exports: [
    MatButtonModule,
    MatInputModule,
    MatMenuModule
  ]
})
export class MaterialModule { }
