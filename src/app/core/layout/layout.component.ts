import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit {
  protected showMenu: boolean = false;
  protected showDemo: boolean = false;
  protected currentRoute!: string;

  private defaultStyle: string = 'pt-6 px-6 lg:px-30 content-height pb-[50px]';
  private SiteDesignStyle: string = 'content-height';
  protected currentStyle: string = this.defaultStyle;

  constructor(private activatedroute: ActivatedRoute, private router: Router) {
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
    this.showMenu = this.activatedroute.snapshot.data['showMenu'];
    this.showDemo = this.activatedroute.snapshot.data['showDemo'];
  }
}
