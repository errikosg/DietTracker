import { Component, OnInit } from '@angular/core';
import { map, switchMap, take } from 'rxjs/operators';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth/auth.service';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { EditMacroGoalsDialogComponent } from '../edit-macro-goals-dialog/edit-macro-goals-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { MacroGoalService } from 'src/app/services/macro-goal/macro-goal.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  faPen = faPen; faTrash = faTrash;
  currentUser: User = null;

  constructor(
    private authService: AuthService,
    private macroGoalService: MacroGoalService,
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
    const dialogWidth = window.innerWidth > 500 ? "50%" : "80%";
    const editMacrosDialog = this.dialog.open(EditMacroGoalsDialogComponent, {
      width: dialogWidth
    });
    editMacrosDialog.afterClosed().subscribe((res) => {
      if(res && res.event === 'submit'){
        this.snackBar.open("Macro goals updated successfully", null, { duration: 1500 });
      }
    });
  }

  onDeleteMacros() {
    const dialogWidth = window.innerWidth > 500 ? "50%" : "80%";
    const alertDialog = this.dialog.open(AlertDialogComponent, {
      width: dialogWidth,
      data: "Are you sure you want to delete your Macro Goals?"
    });

    let mode = "cancel";
    alertDialog.afterClosed().pipe(
      switchMap(res => {
        if(res && res.event === 'submit'){
          mode = res.event
          return this.macroGoalService.deleteMacroGoals()
        }
        else return []
      })
      ).subscribe(() => {
        if(mode === "submit"){
          this.snackBar.open("Macro goals deleted successfully", null, { duration: 1500 });
        }
      })
  }
}
