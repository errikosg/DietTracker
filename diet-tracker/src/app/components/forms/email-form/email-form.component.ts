import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take, map } from 'rxjs';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { EmailFormDialogComponent } from '../email-form-dialog/email-form-dialog.component';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css']
})
export class EmailFormComponent {
  currentUser: User = null;
  // emailForm: FormGroup;

  constructor(
    private authService: AuthService,
    public dialog: MatDialog
  ) {}

  
  ngOnInit(): void {
    // get current user
    this.authService.currentUser$.pipe(
      take(1),
      map(user => {
        this.currentUser = user

        // initialize form
        // this.emailForm = new FormGroup({
        //   'email': new FormControl(this.currentUser.email, [Validators.email, Validators.required])
        // })
      })
    ).subscribe()
  }

  // get nameFormControls() {
  //   return this.emailForm.controls
  // }

  // onSubmit() {
  //   console.log(this.emailForm.value)
  // }

  onOpenFormDialog() {
    const emailFormDialog = this.dialog.open(EmailFormDialogComponent, {
      data: this.currentUser,
      width: '50%'
    });
    emailFormDialog.afterClosed().subscribe((res) => {
      if(res && res.event === 'submit'){
        // got new user, update here.
      }
    });
  }
}
