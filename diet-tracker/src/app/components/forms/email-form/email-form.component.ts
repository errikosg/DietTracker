import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take, map, Subscription } from 'rxjs';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { EmailFormDialogComponent } from '../email-form-dialog/email-form-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    const emailFormDialog = this.dialog.open(EmailFormDialogComponent, {
      data: this.currentUser,
      width: '50%'
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