import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dp-return-link',
  templateUrl: './return-link.component.html',
})
export class ReturnLinkComponent implements OnInit {
  @Input()
  route: string = '';

  @Input()
  text: string = '';

  constructor() {}

  ngOnInit(): void {}
}
