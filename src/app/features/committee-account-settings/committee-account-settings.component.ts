import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordModalComponent } from 'src/app/auth/change-password-modal/change-password-modal.component';
import { ChangePersonalDetailsModalComponent } from 'src/app/auth/change-personal-details-modal/change-personal-details-modal.component';
import { EmailChangeModalComponent } from 'src/app/auth/email-change-modal/email-change-modal.component';

@Component({
  selector: 'dp-committee-account-settings',
  templateUrl: './committee-account-settings.component.html',
})
export class CommitteeAccountSettingsComponent implements OnInit {
  protected email: string = 'james@email.com';
  protected name: string = 'James Johnson';
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialogPassword(): void {
    const dialogRef = this.dialog.open(ChangePasswordModalComponent, {
      width: '690px',
    });
  }

  openDialogEmail(): void {
    const dialogRef = this.dialog.open(EmailChangeModalComponent, {
      width: '690px',
    });
  }

  openDialogPerosnalDetails(): void {
    const dialogRef = this.dialog.open(ChangePersonalDetailsModalComponent, {
      width: '690px',
    });
  }
}
