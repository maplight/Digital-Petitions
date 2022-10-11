import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dp-return-link',
  templateUrl: './return-link.component.html',
})
export class ReturnLinkComponent {
  @Input()
  route!: string;

  @Input()
  text: string = '';
}
