import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from 'src/app/components/auth/auth.component';
import { MaterialModule } from '../shared/material/material.module';
import { PreventLoginAccessService } from 'src/app/services/prevent-login-access.service';
import { NotFoundComponent } from 'src/app/components/not-found/not-found.component';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

const routes: Routes = [
  { path:'auth', component: AuthComponent, canActivate:[PreventLoginAccessService] },
  { path: '**', component: NotFoundComponent, pathMatch: 'full', canActivate: [AuthGuardService] }
]

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthModule { }
