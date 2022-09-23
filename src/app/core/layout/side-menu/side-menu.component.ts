import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, Observable, startWith } from 'rxjs';
import { AccountService } from '../../account-service/account.service';

@Component({
  selector: 'dp-side-menu',
  templateUrl: './side-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuComponent implements OnInit {
  readonly items: { icon: string; route: string; text: string }[] = [];

  protected activatedRoute$!: Observable<string>;

  constructor(private _router: Router, private _accountLogic: AccountService) {
    this.items.push({
      icon: 'custom_icons:home',
      route: '/city-staff/home',
      text: 'Home',
    });
    if (
      this._accountLogic.currentUser?.attributes['custom:access_group'] ===
      'admin'
    ) {
      this.items.push({
        icon: 'custom_icons:sliders',
        route: '/city-staff/admin',
        text: 'Site Admin',
      });
    }
  }

  ngOnInit(): void {
    this.activatedRoute$ = this._router.events.pipe(
      startWith(null),
      filter((event) => event === null || event instanceof NavigationEnd),
      map((_event) => this._router.url)
    );
  }
}
