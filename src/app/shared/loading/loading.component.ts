import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'dp-loading',
  templateUrl: './loading.component.html',
})
export class LoadingComponent implements OnInit {
  @Input() showTitle: boolean = false;
  @Input() show$!: Observable<boolean>;
  constructor() {}

  ngOnInit(): void {}
}
