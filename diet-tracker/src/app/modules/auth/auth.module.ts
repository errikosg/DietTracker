import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from 'src/app/components/auth/auth.component';
import { MaterialModule } from '../shared/material/material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NotFoundComponent } from 'src/app/components/not-found/not-found.component';
import { AuthGuardService } from 'src/app/services/auth-guard/auth-guard.service';
import { PreventLoginAccessService } from 'src/app/services/prevent-login-access/prevent-login-access.service';
import { CustomPasswordComponent } from 'src/app/components/custom-password/custom-password.component';

const routes: Routes = [
  { path:'auth', component: AuthComponent, canActivate:[PreventLoginAccessService] },
  { path: '**', component: NotFoundComponent, pathMatch: 'full', canActivate: [AuthGuardService] }
]

@NgModule({
  declarations: [
    AuthComponent,
    CustomPasswordComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    FontAwesomeModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    CustomPasswordComponent
  ],
})
export class AuthModule { }
