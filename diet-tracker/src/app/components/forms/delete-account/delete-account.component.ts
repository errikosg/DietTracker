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
    public dialog: MatDialog
  ){}

  onDelete() {
    const deleteAccountDialog = this.dialog.open(DeleteAccountDialogComponent, {
      width: '50%'
    });
    deleteAccountDialog.afterClosed().subscribe((res) => {
      if(res && res.event === 'submit'){
        // logout ....
        console.log("deletingg..")
        this.authService.deleteAccount();
      }
    });
  }
}
