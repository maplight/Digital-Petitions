import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dp-error-msg',
  templateUrl: './error-msg.component.html',
})
export class ErrorMsgComponent implements OnInit {
  @Input() error!: string;
  constructor() {}

  ngOnInit(): void {}
}
