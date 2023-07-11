import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteAccountDialogComponent } from '../delete-account-dialog/delete-account-dialog.component';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent {

  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
  ){}

  onDelete() {
    const dialogWidth = window.innerWidth > 500 ? "50%" : "80%";
    const deleteAccountDialog = this.dialog.open(DeleteAccountDialogComponent, {
      width: dialogWidth
    });
    deleteAccountDialog.afterClosed().subscribe((res) => {
      if(res && res.event === 'submit'){
        // logout ....
        this.authService.deleteAccount();
      }
    });
  }
}
