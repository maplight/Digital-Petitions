import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import {
  PetitionStatus,
  PetitionStatusQuery,
  PetitionType,
} from 'src/app/core/api/API';
import { FilterByStatus } from '../models/filter/filter-by-status';
import { FilterByType } from '../models/filter/filter-by-type';

@Component({
  selector: 'dp-filter-by-status',
  templateUrl: './filter-by-status.component.html',
})
export class FilterByStatusComponent implements OnInit {
  @Input() mode: 'Select' | 'Chip' | 'Both' = 'Both';
  @Input() disabled: boolean = false;
  @Input() filterName: string = '';
  @Input() filterStatus: FilterByStatus[] = [];
  @Output() event: EventEmitter<PetitionStatusQuery | undefined> =
    new EventEmitter();
  protected cursor: string = this.disabled ? 'cursor-auto' : 'cursor-pointer';
  protected activeStyle: string = `border-solid border border-primary-500  bg-primany-100 font-extrabold text-primary-500 ${this.cursor}`;
  protected inActiveStyle: string = `border-solid border border-gray-400 bg-white  font-bold  text-gray-500 ${this.cursor}`;
  protected itemActive$: Subject<string | undefined> = new Subject();
  constructor() {}

  protected sendFilter(value: FilterByStatus) {
    if (!this.disabled) {
      this.filterStatus.forEach((item) => {
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
    if (this.filterStatus.length >= 0) {
      this.filterStatus.forEach((item) => {
        if (item.active) {
          this.itemActive$.next(item.value);
        }
      });
    }
  }
}
