import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditMacroGoalsDialogComponent } from 'src/app/components/edit-macro-goals-dialog/edit-macro-goals-dialog.component';
import { DeleteAccountDialogComponent } from 'src/app/components/forms/delete-account-dialog/delete-account-dialog.component';
import { DeleteAccountComponent } from 'src/app/components/forms/delete-account/delete-account.component';
import { EmailFormDialogComponent } from 'src/app/components/forms/email-form-dialog/email-form-dialog.component';
import { EmailFormComponent } from 'src/app/components/forms/email-form/email-form.component';
import { NameFormComponent } from 'src/app/components/forms/name-form/name-form.component';
import { PassFormComponent } from 'src/app/components/forms/pass-form/pass-form.component';
import { MacroGoalsDisplayComponent } from 'src/app/components/macro-goals-display/macro-goals-display.component';
import { ProfileComponent } from 'src/app/components/profile/profile.component';
import { FontsModule } from '../shared/fonts/fonts.module';
import { MaterialModule } from '../shared/material/material.module';
import { MacroModule } from '../shared/macro/macro.module';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/services/auth-guard/auth-guard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExtraModule } from '../shared/extra/extra.module';

const routes: Routes = [
  { path: '', component: ProfileComponent, canActivate: [AuthGuardService] }
]

@NgModule({
  declarations: [
    ProfileComponent,
    DeleteAccountComponent,
    DeleteAccountDialogComponent,
    EmailFormComponent,
    EmailFormDialogComponent,
    NameFormComponent,
    PassFormComponent,
    MacroGoalsDisplayComponent,
    EditMacroGoalsDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FontsModule,
    MacroModule,
    ExtraModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    ProfileComponent,
    DeleteAccountComponent,
    DeleteAccountDialogComponent,
    EmailFormComponent,
    EmailFormDialogComponent,
    NameFormComponent,
    PassFormComponent,
    MacroGoalsDisplayComponent,
    EditMacroGoalsDialogComponent
  ]
})
export class ProfileModule { }
