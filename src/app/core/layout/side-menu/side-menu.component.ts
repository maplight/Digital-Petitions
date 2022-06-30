import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'dp-side-menu',
  templateUrl: './side-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuComponent implements OnInit {
  readonly items = [
    {
      icon: 'home',
      route: '/city-staff/home',
      text: 'Home',
    },
    {
      icon: 'settings_applications',
      route: '/city-staff/admin',
      text: 'Site Admin',
    },
  ];

  protected activatedRoute$!: Observable<string>;

  constructor(private _router: Router) {}

  ngOnInit(): void {
    this.activatedRoute$ = this._router.events.pipe(
      startWith(null),
      filter((event) => event === null || event instanceof NavigationEnd),
      map((_event) => this._router.url)
    );
  }
}
