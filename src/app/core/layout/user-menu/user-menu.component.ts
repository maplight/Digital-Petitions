import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { AccountService } from 'src/app/auth/account-service/account.service';
import { DialogResultComponent } from 'src/app/shared/dialog-result/dialog-result.component';
import { SignOutService } from '../../../application/sign-out.service';

@Component({
  selector: 'dp-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent implements OnInit, OnDestroy {
  private result$;
  private _unsubscribeAll: Subject<void> = new Subject();
  protected currentUser$;

  constructor(
    private AccountService: AccountService,
    private SignOutService: SignOutService,
    public dialog: MatDialog
  ) {
    this.result$ = this.SignOutService.result$
      .pipe(
        tap((result) => {
          if (!!result.result) {
            //redirect to login
            AccountService.updateUser(false);
          } else {
            //I'm not sure this is the best way to handle errors here
            this.openDialog(
              'An error has occurred',
              result.error ? result.error : '',
              false
            );
          }
        }),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe();
    this.currentUser$ = AccountService.currentUser$;
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  openDialog(title: string, message: string, success: boolean): void {
    const dialogRef = this.dialog.open(DialogResultComponent, {
      width: '520px',
      data: {
        title: title,
        message: message,
        success: success,
      },
    });
  }

  signOut() {
    this.SignOutService.signOut();
  }
}
