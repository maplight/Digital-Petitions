import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'dp-select-type-petition',
  templateUrl: './select-type-petition.component.html',
})
export class SelectTypePetitionComponent implements OnInit {
  typePetition: string = '';

  @Output() cancelEvent: EventEmitter<void> = new EventEmitter();
  @Output() submitEvent: EventEmitter<string> = new EventEmitter();

  types: string[] = ['Candidate', 'Issue'];
  constructor() {}

  ngOnInit(): void {}

  submit() {
    this.submitEvent.emit(this.typePetition);
  }

  cancel() {
    this.cancelEvent.emit();
  }
}
