import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'dp-sort-signatures',
  templateUrl: './sort-signatures.component.html',
})
export class SortSignaturesComponent implements OnInit {
  @Input() disabled: boolean = false;
  @Input() filterName: string = '';
  @Input() elements: {
    name: string;
    value: 'signer_name' | 'signer_date' | 'address' | 'email' | 'registered';
    active: boolean;
  }[] = [];
  @Output() event: EventEmitter<
    'signer_name' | 'signer_date' | 'address' | 'email' | 'registered'
  > = new EventEmitter();
  protected cursor: string = this.disabled ? 'cursor-auto' : 'cursor-pointer';
  protected activeStyle: string = `border-solid border border-primary-500  bg-primany-100 font-extrabold text-primary-500 ${this.cursor}`;
  protected inActiveStyle: string = `border-solid border border-gray-400 bg-white  font-bold  text-gray-500 ${this.cursor}`;
  protected itemActive$: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  constructor() {}

  protected sendFilter(value: {
    name: string;
    value: 'signer_name' | 'signer_date' | 'address' | 'email' | 'registered';
    active: boolean;
  }) {
    if (!this.disabled) {
      this.elements.forEach((item) => {
        if (item === value) {
          item.active = true;
          this.itemActive$.next(item.value);
        } else {
          item.active = false;
        }
      });
      this.event.emit(value.value);
    }
  }

  ngOnInit(): void {
    this.elements.forEach((item) => {
      if (item.active) {
        this.itemActive$.next(item.value);
      }
    });
  }
}
