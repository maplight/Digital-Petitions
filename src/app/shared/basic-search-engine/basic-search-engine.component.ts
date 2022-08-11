import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'dp-basic-search-engine',
  templateUrl: './basic-search-engine.component.html',
})
export class BasicSearchEngineComponent implements OnInit {
  @Input() disabled: boolean = false;
  @Input() filterName: string = '';
  @Input() elements: { name: string; value: string; active: boolean }[] = [];
  @Output() event: EventEmitter<string> = new EventEmitter();
  public formGroup: FormGroup;

  constructor(private _fb: FormBuilder) {
    this.formGroup = this._fb.group({
      keyword: [''],
    });
  }

  protected sendFilter() {
    if (!this.disabled) {
      this.event.emit(this.formGroup.value.keyword);
    }
  }

  ngOnInit(): void {}
}