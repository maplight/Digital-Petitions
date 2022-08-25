import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'dp-loading-bar',
  templateUrl: './loading-bar.component.html',
})
export class LoadingBarComponent implements OnInit {
  @Input() title: string | undefined;
  @Input() show$!: Observable<boolean>;
  constructor() {}

  ngOnInit(): void {}
}
