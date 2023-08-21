import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from 'src/app/components/auth/auth.component';
import { MaterialModule } from '../shared/material/material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PreventLoginAccessService } from 'src/app/services/prevent-login-access/prevent-login-access.service';
import { ExtraModule } from '../shared/extra/extra.module';

const routes: Routes = [
  { path:'auth', component: AuthComponent, canActivate:[PreventLoginAccessService] },
]

@NgModule({
  declarations: [
    AuthComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    FontAwesomeModule,
    ExtraModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthModule { }
