import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { AccountService } from 'src/app/auth/account-service/account.service';
import { SignOutService } from 'src/app/logic/auth/exports';
import { DialogResultComponent } from 'src/app/shared/dialog-result/dialog-result.component';

@Component({
  selector: 'dp-user-menu',
  templateUrl: './user-menu.component.html',
})
export class UserMenuComponent implements OnInit, OnDestroy {
  private result$;
  private _unsubscribeAll: Subject<void> = new Subject();
  protected currentUser$;

  constructor(
    private AccountService: AccountService,
    private _router: Router,
    private SignOutService: SignOutService,
    public dialog: MatDialog
  ) {
    this.result$ = this.SignOutService.result$
      .pipe(
        tap((result) => {
          if (!!result.result) {
            this._router.navigate(['login']);
            console.log('aqui');
          } else {
            console.log('aquix2');
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
    this.currentUser$ = this.AccountService.currentUser$;
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
