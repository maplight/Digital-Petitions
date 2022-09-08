import { Component, OnInit } from '@angular/core';
import { ThemingService } from '../../dynamic-theme/theming.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  protected img$!: Observable<string>;
  constructor(private _themingService: ThemingService) {
    this.img$ = _themingService._logo$;
  }

  ngOnInit(): void {}
}
