import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { AccountService } from 'src/app/core/account-service/account.service';
import { SignOutService } from 'src/app/logic/auth/exports';
import { DialogResultComponent } from 'src/app/shared/dialog-result/dialog-result.component';
import { CognitoUserFacade } from 'src/app/shared/models/auth/user';

@Component({
  selector: 'dp-user-menu',
  templateUrl: './user-menu.component.html',
  providers: [SignOutService],
})
export class UserMenuComponent implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<void> = new Subject();
  protected currentUser!: CognitoUserFacade | undefined;
  protected isLoged$!: Observable<boolean>;

  constructor(
    private _accountLogic: AccountService,
    private _router: Router,
    private _signOutLogic: SignOutService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._signOutLogic.success$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this._router.navigate(['/auth/login']);
        this._accountLogic.getCurrentUser();
      });

    this._signOutLogic.error$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((error) => {
        this.openDialog('An error has occurred', error ?? '', false);
      });

    this.currentUser = this._accountLogic.currentUser;

    this.isLoged$ = this._accountLogic.isAuthenticated$;
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  openDialog(title: string, message: string, success: boolean): void {
    this.dialog.open(DialogResultComponent, {
      width: '520px',
      data: {
        title: title,
        message: message,
        success: success,
      },
    });
  }

  signOut() {
    this._signOutLogic.signOut();
  }
}
