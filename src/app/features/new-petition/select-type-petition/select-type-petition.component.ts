import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'dp-select-type-petition',
  templateUrl: './select-type-petition.component.html',
})
export class SelectTypePetitionComponent implements OnInit {
  typePetition: string = '';

  @Output() _cancelEvent: EventEmitter<void> = new EventEmitter();
  @Output() _submitEvent: EventEmitter<string> = new EventEmitter();

  types: string[] = ['Candidate', 'Issue'];
  constructor() {}

  ngOnInit(): void {}

  submit() {
    this._submitEvent.emit(this.typePetition);
  }

  cancel() {
    this._cancelEvent.emit();
  }
}
