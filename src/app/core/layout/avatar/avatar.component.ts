import { Component, Input, OnInit } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { AccountService } from 'src/app/core/account-service/account.service';

@Component({
  selector: 'dp-avatar',
  templateUrl: './avatar.component.html',
})
export class AvatarComponent implements OnInit {
  protected l_avatar!: string;
  constructor(private _accountLogic: AccountService) {}

  ngOnInit(): void {
    console.log(this._accountLogic.currentUser);
    if (this._accountLogic.currentUser) {
      this.l_avatar =
        this._accountLogic.currentUser?.attributes.given_name[0].toUpperCase() +
        this._accountLogic.currentUser?.attributes.family_name[0].toUpperCase();
    } else {
      this.l_avatar = 'ML';
    }
  }
}
