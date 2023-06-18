import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthComponent } from 'src/app/components/auth/auth.component';
import { MaterialModule } from '../shared/material/material.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path:'auth', component: AuthComponent }]),
    MaterialModule
  ]
})
export class AuthModule { }
