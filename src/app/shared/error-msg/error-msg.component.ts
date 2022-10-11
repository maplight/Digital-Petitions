import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dp-error-msg',
  templateUrl: './error-msg.component.html',
})
export class ErrorMsgComponent {
  @Input() error!: string;
}
