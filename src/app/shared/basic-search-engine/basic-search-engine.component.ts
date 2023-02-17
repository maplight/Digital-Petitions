import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  merge,
  Observable,
  Subject,
} from 'rxjs';

@Component({
  selector: 'dp-basic-search-engine',
  templateUrl: './basic-search-engine.component.html',
})
export class BasicSearchEngineComponent {
  @Input() disabled: boolean = false;
  @Input() name: string = 'Search';

  private readonly _event = new EventEmitter<string>();
  searchUpdate = new Subject<string>();

  @Output() event: Observable<string> = merge(
    this._event,
    this.searchUpdate.pipe(debounceTime(400), distinctUntilChanged())
  );

  public formGroup: FormGroup;
  constructor(private _fb: FormBuilder) {
    this.formGroup = this._fb.group({
      keyword: [''],
    });
  }

  protected sendFilter() {
    if (!this.disabled) {
      this._event.emit(this.formGroup.value.keyword);
    }
  }

  protected submit(event: any) {
    this.searchUpdate.next(event.target.value);
  }
}
