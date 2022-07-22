import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil, tap } from 'rxjs';
import { AccountService } from 'src/app/auth/account-service/account.service';
import { User } from 'src/app/auth/user';
import { DialogResultComponent } from 'src/app/shared/dialog-result/dialog-result.component';
import { SignOutService } from '../../../logic/sign-out.service';

@Component({
  selector: 'dp-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnInit {
  private _unsubscribeAll: Subject<void> = new Subject();
  private $currentUser;

  protected l_avatar: string = '';
  protected url = '';
  constructor(private AccountService: AccountService) {
    this.$currentUser = AccountService.currentUser$
      .pipe(
        tap((data) => {
          if (!!data) {
            this.l_avatar =
              data.firstName[0].toUpperCase() + data.lastName[0].toUpperCase();
            this.url = data.url;
          }
        }),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe();
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  private update_avatar(user: User) {
    this.l_avatar =
      user.firstName[0].toUpperCase() + user.lastName[0].toUpperCase();
  }
}
