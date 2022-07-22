import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dp-confirm',
  templateUrl: './confirm.component.html',
})
export class ConfirmComponent implements OnInit {
  @Input()
  public title: string = '';

  @Input()
  public text: string = '';

  constructor() {}

  ngOnInit(): void {}
}
