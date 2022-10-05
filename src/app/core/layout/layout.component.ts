import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { takeUntil, map, tap, Observable, Subject } from 'rxjs';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit {
  protected showMenu: boolean = false;
  protected showDemo: boolean = false;
  protected currentRoute!: string;
  protected id?: string;
  private _unsubscribeAll: Subject<void> = new Subject();
  private defaultStyle: string = 'pt-6 px-6 lg:px-30 content-height pb-[50px]';
  private SiteDesignStyle: string = 'content-height';
  protected currentStyle: string = this.defaultStyle;

  constructor(private _activatedRoute: ActivatedRoute, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/city-staff/site-design') {
          this.currentStyle = this.SiteDesignStyle;
        } else {
          this.currentStyle = this.defaultStyle;
        }
      }
    });
  }

  ngOnInit(): void {
    this.showMenu = this._activatedRoute.snapshot.data['showMenu'];
    this.showDemo = this._activatedRoute.snapshot.data['showDemo'];
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
