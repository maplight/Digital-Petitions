import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'dp-new-box',
  templateUrl: './new-box.component.html',
})
export class NewBoxComponent implements OnInit {
  @Output() approveEvent: EventEmitter<void> = new EventEmitter();
  @Output() denyEvent: EventEmitter<void> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
