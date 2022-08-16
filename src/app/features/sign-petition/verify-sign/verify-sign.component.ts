import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, merge, Observable, tap } from 'rxjs';

import { SignaturePetitionType } from 'src/app/shared/models/petition/signature-petition-type';

@Component({
  selector: 'dp-verify-sign',
  templateUrl: './verify-sign.component.html',
})
export class VerifySignComponent implements OnInit {
  protected formGroup: FormGroup;
  protected formGroupLicense: FormGroup;
  protected isContinue$: Observable<boolean>;
  @Output() submitEvent: EventEmitter<SignaturePetitionType> =
    new EventEmitter<SignaturePetitionType>();
  @Output() cancelEvent: EventEmitter<
    'loading' | 'verify' | 'empty' | 'view' | 'sign' | 'error'
  > = new EventEmitter<
    'loading' | 'verify' | 'empty' | 'view' | 'sign' | 'error'
  >();
  constructor(private _fb: FormBuilder) {
    this.formGroup = this._fb.group({
      verifyType: ['', [Validators.required]],
    });
    this.formGroupLicense = this._fb.group({
      licenseNumber: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
    });
    this.isContinue$ = merge(
      this.formGroup.valueChanges,
      this.formGroupLicense.valueChanges
    ).pipe(
      map(() => {
        return this.formGroup.valid
          ? this.formGroup.value.verifyType === 'license'
            ? this.formGroupLicense.valid
              ? true
              : false
            : true
          : false;
      })
    );
  }

  ngOnInit(): void {}
  cancel(value: 'loading' | 'verify' | 'empty' | 'view' | 'sign' | 'error') {
    this.cancelEvent.emit(value);
  }

  submit() {
    if (this.formGroup.valid) {
      if (this.formGroup.value.verifyType === 'license') {
        if (this.formGroupLicense.valid) {
          this.submitEvent.emit({
            verifyType: this.formGroup.value.verifyType,
            licenseNumber: this.formGroupLicense.value.licenseNumber,
            dateOfBirth: this.formGroupLicense.value.dateOfBirth,
          });
        } else {
          this.formGroupLicense.markAllAsTouched();
        }
      } else {
        this.submitEvent.emit({
          verifyType: this.formGroup.value.verifyType,
        });
      }
    }
  }
}
