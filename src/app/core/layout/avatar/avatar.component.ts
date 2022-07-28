import { Component, Input, OnInit } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { AccountService } from 'src/app/auth/account-service/account.service';

@Component({
  selector: 'dp-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnInit {
  private _unsubscribeAll: Subject<void> = new Subject();
  protected currentUser$;

  protected l_avatar: string = '';
  constructor(private AccountService: AccountService) {
    this.currentUser$ = this.AccountService.currentUser$
      .pipe(
        tap((data) => {
          if (!!data) {
            const name: { firstName: string; lastName: string } = JSON.parse(
              data.attributes.name
            );
            this.l_avatar =
              name.firstName[0].toUpperCase() + name.lastName[0].toUpperCase();
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
