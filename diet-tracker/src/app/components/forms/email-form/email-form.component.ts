import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take, map, Subscription } from 'rxjs';
import { User } from 'src/app/models/User';
import { EmailFormDialogComponent } from '../email-form-dialog/email-form-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css']
})
export class EmailFormComponent implements OnInit, OnDestroy{
  currentUser: User = null;
  subscription$: Subscription;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  
  ngOnInit(): void {
    // get current user
    this.authService.currentUser$.pipe(
      take(1),
      map(user => {
        this.currentUser = user
      })
    ).subscribe()

    this.subscription$ = this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    })
  }

  onOpenFormDialog() {
    const dialogWidth = window.innerWidth > 500 ? "50%" : "80%";
    const emailFormDialog = this.dialog.open(EmailFormDialogComponent, {
      data: this.currentUser,
      width: dialogWidth
    });
    emailFormDialog.afterClosed().subscribe((res) => {
      if(res && res.event === 'submit'){
        this.snackBar.open("Email updated successfully", null, { duration: 1500 });
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe()
  }
}
