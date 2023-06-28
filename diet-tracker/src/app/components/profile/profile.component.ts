import { Component, OnInit } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth/auth.service';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { EditMacroGoalsDialogComponent } from '../edit-macro-goals-dialog/edit-macro-goals-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  faPen = faPen; faTrash = faTrash;
  currentUser: User = null

  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // get current user
    this.authService.currentUser$.pipe(
      take(1),
      map(user => {
        this.currentUser = user
      })
    ).subscribe()
  }

  onUpdateMacros() {
    const editMacrosDialog = this.dialog.open(EditMacroGoalsDialogComponent, {
      width: '50%'
    });
    editMacrosDialog.afterClosed().subscribe((res) => {
      if(res && res.event === 'submit'){
        this.snackBar.open("Macro goals updated successfully", null, { duration: 1500 });
      }
    });
  }

  onDeleteMacros() {
    const alertDialog = this.dialog.open(AlertDialogComponent, {
      width: '50%',
      data: "Are you sure you want to delete your Macro Goals?"
    });
    alertDialog.afterClosed().subscribe(res => {
      if(res && res.event === 'submit'){
        this.snackBar.open("Macro goals deleted successfully", null, { duration: 1500 });
      }
    })
  }
}
