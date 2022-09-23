import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, merge, Observable, Subject } from 'rxjs';
import {
  SignatureVerificationInput,
  VerificationMethod,
  VoterRecordMatch,
} from 'src/app/core/api/API';
import { SignPetitionService } from 'src/app/logic/petition/sign-petition.service';

@Component({
  selector: 'dp-verify-sign',
  templateUrl: './verify-sign.component.html',
  providers: [SignPetitionService],
})
export class VerifySignComponent implements OnInit {
  @Input() dataSignature!: VoterRecordMatch;
  @Input() title!: string;
  @Input() id!: string;
  protected formGroup: FormGroup;
  protected formGroupLicense: FormGroup;
  protected isContinue$: Observable<boolean>;
  protected error$!: Observable<string | undefined>;
  private localError$: Subject<string> = new Subject();
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
  }

  ngOnInit(): void {
    this._signPetitionLogic.success$.subscribe((data) => {
      if (data?.error) {
        this.localError$.next(data.error);
      } else if (data?.confirmationRequired) {
        this._router.navigate(['/petition/confirm-code']);
      } else {
        this._router.navigate(['/petition/result-confirm-code']);
      }
    });
    this.loading$ = this._signPetitionLogic.loading$;
    this.error$ = merge(this._signPetitionLogic.error$, this.localError$);
  }
  cancel(value: 'verify' | 'view' | 'sign') {
    this.cancelEvent.emit(value);
  }

  submit() {
    let _signatureVerificationInput: SignatureVerificationInput = {
      address: this.dataSignature.address,
      city: this.dataSignature.city,
      fullName: this.dataSignature.fullName,
      method: VerificationMethod.CALL,
      methodPayload: [],
      state: this.dataSignature.state,
      token: this.dataSignature.token ?? '',
      zipCode: this.dataSignature.zipCode,
      id: this.id,
      title: this.title,
    };
    if (this.formGroup.valid) {
      if (this.formGroup.value.verifyType === 'license') {
        if (this.formGroupLicense.valid) {
          _signatureVerificationInput.method = VerificationMethod.STATE_ID;
          _signatureVerificationInput.methodPayload = [
            this.formGroupLicense.value.licenseNumber,
            this.formGroupLicense.value.dateOfBirth,
          ];
        } else {
          this.formGroupLicense.markAllAsTouched();
        }
      } else {
        switch (this.formGroup.value.verifyType) {
          case 'Email':
            _signatureVerificationInput.method = VerificationMethod.EMAIL;
            break;
          case 'Text':
            _signatureVerificationInput.method = VerificationMethod.TEXT;
            break;
          case 'Call':
            _signatureVerificationInput.method = VerificationMethod.CALL;
            break;
          case 'USMail':
            _signatureVerificationInput.method = VerificationMethod.POSTAL;
            break;
        }
      }

      this._signPetitionLogic.signPetition(_signatureVerificationInput);
    }
  }

  showMethod(value: string): boolean {
    return this.dataSignature.methods.indexOf(value) >= 0;
  }
}
