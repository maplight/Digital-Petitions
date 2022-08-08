import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'dp-basic-filter',
  templateUrl: './basic-filter.component.html',
})
export class BasicFilterComponent implements OnInit {
  @Input() disabled: boolean = false;
  @Input() filterName: string = '';
  @Input() elements: { name: string; value: string; active: boolean }[] = [];
  @Output() event: EventEmitter<string> = new EventEmitter();
  protected cursor: string = this.disabled ? 'cursor-auto' : 'cursor-pointer';
  protected activeStyle: string = `border-solid border border-primary-500  bg-primany-100 font-extrabold text-primary-500 ${this.cursor}`;
  protected inActiveStyle: string = `border-solid border border-gray-400 bg-white  font-bold  text-gray-500 ${this.cursor}`;
  constructor() {}

  protected sendFilter(value: {
    name: string;
    value: string;
    active: boolean;
  }) {
    if (!this.disabled) {
      this.elements.forEach((item) => {
        if (item === value) {
          item.active = true;
        } else {
          item.active = false;
        }
      });
      this.event.emit(value.value);
    }
  }

  ngOnInit(): void {}
}
