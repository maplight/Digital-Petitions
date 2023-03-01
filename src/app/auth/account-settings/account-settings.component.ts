import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordModalComponent } from 'src/app/auth/change-password-modal/change-password-modal.component';
import { ChangePersonalDetailsModalComponent } from 'src/app/auth/change-personal-details-modal/change-personal-details-modal.component';
import { EmailChangeModalComponent } from 'src/app/auth/email-change-modal/email-change-modal.component';
import { AccountService } from 'src/app/core/account-service/account.service';
import { CognitoUserFacade } from 'src/app/shared/models/auth/user';

@Component({
  selector: 'dp-committee-account-settings',
  templateUrl: './account-settings.component.html',
})
export class AccountSettingsComponent implements OnInit, OnDestroy {
  protected currentUser!: CognitoUserFacade | undefined;
  subscription!: Subscription;
  constructor(
    private dialog: MatDialog,
    private _accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.currentUser = this._accountService.currentUser;

    this.subscription = this._accountService._updateUser$.subscribe((_) => {
      if (_) {
        this.currentUser = this._accountService.currentUser;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

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

  openDialogPersonalDetails(): void {
    const dialogRef = this.dialog.open(ChangePersonalDetailsModalComponent, {
      width: '690px',
    });
  }
}
