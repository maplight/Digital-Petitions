import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { BehaviorSubject, of, ReplaySubject, Subject, takeUntil } from 'rxjs';
import { PetitionStatus, PetitionType } from 'src/app/core/api/API';
import { FilterByStatus } from '../models/filter/filter-by-status';
import { FilterByType } from '../models/filter/filter-by-type';

@Component({
  selector: 'dp-filter-by-category',
  templateUrl: './filter-by-category.component.html',
})
export class FilterByCategoryComponent implements OnInit, OnDestroy {
  @Input() mode: 'Select' | 'Chip' | 'Both' = 'Both';
  @Input() disabled: boolean = false;
  @Input() filterName: string = '';
  @Input() filterType: FilterByType[] = [];
  @Output() event: EventEmitter<PetitionType | undefined | 'ANY'> =
    new EventEmitter();
  protected cursor: string = this.disabled ? 'cursor-auto' : 'cursor-pointer';
  protected activeStyle: string = `border-solid border border-primary-500  bg-primany-100 font-extrabold text-primary-500 ${this.cursor}`;
  protected inActiveStyle: string = `border-solid border border-gray-400 bg-white  font-bold  text-gray-500 ${this.cursor}`;
  protected itemActive$: ReplaySubject<string | undefined | null> =
    new ReplaySubject();
  protected _unSuscribeAll: Subject<void> = new Subject();
  constructor() {}
  ngOnDestroy(): void {
    this._unSuscribeAll.next();
    this._unSuscribeAll.complete();
    this.itemActive$.complete();
  }

  protected sendFilter(value: FilterByType) {
    if (!this.disabled) {
      this.filterType.forEach((item) => {
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
    of(this.filterType)
      .pipe(takeUntil(this._unSuscribeAll))
      .subscribe((value) => {
        value.forEach((item) => {
          if (item.active) {
            this.itemActive$.next(item.value);
          }
        });
      });
  }
}
