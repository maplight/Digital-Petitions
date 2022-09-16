import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, merge, Observable, Subscription, tap } from 'rxjs';
import { SignPetitionService } from 'src/app/logic/petition/sign-petition.service';
import { Result } from 'src/app/shared/models/exports';
import { SignaturePetitionData } from 'src/app/shared/models/petition/signature-petition-data';

import { SignaturePetitionType } from 'src/app/shared/models/petition/signature-petition-type';

@Component({
  selector: 'dp-verify-sign',
  templateUrl: './verify-sign.component.html',
})
export class VerifySignComponent implements OnInit {
  @Input() dataSignature!: SignaturePetitionData;
  protected formGroup: FormGroup;
  protected formGroupLicense: FormGroup;
  protected isContinue$: Observable<boolean>;
  protected result$!: Observable<Result<string>>;
  protected error: string | undefined;
  protected loading$!: Observable<boolean>;

  @Output() cancelEvent: EventEmitter<'verify' | 'view' | 'sign'> =
    new EventEmitter<'verify' | 'view' | 'sign'>();
  constructor(
    private _fb: FormBuilder,
    private _signPetitionLogic: SignPetitionService,
    private _router: Router
  ) {
    this.formGroup = this._fb.group({
      verifyType: ['', [Validators.required]],
    });
    this.formGroupLicense = this._fb.group({
      licenseNumber: ['', [Validators.required]],
      dateOfBirth: [Date, [Validators.required]],
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

    this.result$ = this._signPetitionLogic.result$.pipe(
      tap((result) => {
        if (!!result.result) {
          this._router.navigate(['/petition/confirm-code']);
        } else {
          this.error = result.error;
        }
      })
    );
    this.loading$ = this._signPetitionLogic.loading$;
  }

  ngOnInit(): void {}
  cancel(value: 'verify' | 'view' | 'sign') {
    this.cancelEvent.emit(value);
  }

  submit() {
    if (this.formGroup.valid) {
      if (this.formGroup.value.verifyType === 'license') {
        if (this.formGroupLicense.valid) {
          this.dataSignature.verify = {
            verifyType: this.formGroup.value.verifyType,
            licenseNumber: this.formGroupLicense.value.licenseNumber,
            dateOfBirth: this.formGroupLicense.value.dateOfBirth,
          };
        } else {
          this.formGroupLicense.markAllAsTouched();
        }
      } else {
        this.dataSignature.verify = {
          verifyType: this.formGroup.value.verifyType,
        };
      }

      this._signPetitionLogic.signPetition(this.dataSignature);
    }
  }
}
