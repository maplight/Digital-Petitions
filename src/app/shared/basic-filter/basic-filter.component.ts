import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'dp-basic-filter',
  templateUrl: './basic-filter.component.html',
})
export class BasicFilterComponent implements OnInit {
  @Input() disabled: boolean = false;
  @Input() filterName: string = '';
  @Input() elements: { name: string; value: string; active: boolean }[] = [];
  @Output() event: EventEmitter<string> = new EventEmitter();
  constructor() {}

  protected sendFilter(value: {
    name: string;
    value: string;
    active: boolean;
  }) {
    this.elements.forEach((item) => {
      if (item === value) {
        item.active = true;
      } else {
        item.active = false;
      }
    });
    this.event.emit(value.value);
  }

  ngOnInit(): void {}
  //class="border-solid border focus:border-blue-500 border-gray-400 bg-white focus:bg-blue-100 focus:font-extrabold font-bold focus:text-blue-600 text-gray-500"
}
