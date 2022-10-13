import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'dp-new-box',
  templateUrl: './new-box.component.html',
})
export class NewBoxComponent {
  @Output() approveEvent = new EventEmitter<void>();

  @Output() denyEvent = new EventEmitter<void>();
}
