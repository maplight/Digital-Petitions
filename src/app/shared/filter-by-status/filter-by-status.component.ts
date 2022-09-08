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
import { PetitionStatusQuery } from 'src/app/core/api/API';
import { FilterByStatus } from '../models/filter/filter-by-status';

@Component({
  selector: 'dp-filter-by-status',
  templateUrl: './filter-by-status.component.html',
})
export class FilterByStatusComponent implements OnInit, OnDestroy {
  @Input() mode: 'Select' | 'Chip' | 'Both' = 'Both';
  @Input() disabled: boolean = false;
  @Input() filterName: string = '';
  @Input() filterStatus: FilterByStatus[] = [];
  @Output() event: EventEmitter<PetitionStatusQuery> = new EventEmitter();
  protected cursor: string = this.disabled ? 'cursor-auto' : 'cursor-pointer';
  protected activeStyle: string = `border-solid border border-primary-500  bg-primany-100 font-extrabold text-primary-500 ${this.cursor}`;
  protected inActiveStyle: string = `border-solid border border-gray-400 bg-white  font-bold  text-gray-500 ${this.cursor}`;
  protected itemActive$: ReplaySubject<PetitionStatusQuery | undefined> =
    new ReplaySubject();
  protected _unSuscribeAll: Subject<void> = new Subject();
  constructor() {}
  ngOnDestroy(): void {
    this._unSuscribeAll.next();
    this._unSuscribeAll.complete();
    this.itemActive$.complete();
  }

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
    of(this.filterStatus)
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
