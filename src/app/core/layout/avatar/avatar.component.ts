import { Component, Input, OnInit } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { AccountService } from 'src/app/core/account-service/account.service';

@Component({
  selector: 'dp-avatar',
  templateUrl: './avatar.component.html',
})
export class AvatarComponent implements OnInit {
  private _unsubscribeAll: Subject<void> = new Subject();
  protected currentUser$;

  protected l_avatar: string = '';
  constructor(private _accountLogic: AccountService) {
    this.currentUser$ = this._accountLogic.currentUser$
      .pipe(
        tap((data) => {
          if (!!data) {
            this.l_avatar =
              data.attributes.given_name[0].toUpperCase() +
              data.attributes.family_name[0].toUpperCase();
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
}
