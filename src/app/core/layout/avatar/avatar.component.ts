import { Component, Input, OnInit } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { AccountService } from 'src/app/core/account-service/account.service';

@Component({
  selector: 'dp-avatar',
  templateUrl: './avatar.component.html',
})
export class AvatarComponent implements OnInit {
  protected letters!: string;
  constructor(private _accountService: AccountService) {}

  ngOnInit(): void {
    if (this._accountService.currentUser) {
      this.letters =
        this._accountService.currentUser?.attributes.given_name[0].toUpperCase() +
        this._accountService.currentUser?.attributes.family_name[0].toUpperCase();
    } else {
      this.letters = 'ML';
    }
  }
}
