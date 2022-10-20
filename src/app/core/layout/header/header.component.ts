import { Component, OnInit } from '@angular/core';
import { ThemingService } from '../../dynamic-theme/theming.service';
import { Observable } from 'rxjs';
import { SiteConfiguration } from '../../api/API';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  protected theme$!: Observable<SiteConfiguration | null | undefined>;
  constructor(private _themingService: ThemingService) {}

  ngOnInit(): void {
    this.theme$ = this._themingService.theme$;
  }
}
