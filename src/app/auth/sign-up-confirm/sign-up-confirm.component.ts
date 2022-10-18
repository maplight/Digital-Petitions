import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  map,
  merge,
  Observable,
  shareReplay,
  Subject,
  takeUntil,
  tap,
} from 'rxjs';
import { SignUpConfirmService } from 'src/app/logic/auth/sign-up-confirm.service';
import { SignUpResendCodeService } from 'src/app/logic/auth/sign-up-resend-code.service';
import { SignUpService } from 'src/app/logic/auth/sign-up.service';

@Component({
  selector: 'dp-sign-up-confirm',
  templateUrl: './sign-up-confirm.component.html',
  providers: [SignUpConfirmService],
})
export class SignUpConfirmComponent implements OnInit, OnDestroy {
  protected error$!: Observable<string | undefined>;

  protected loading$!: Observable<boolean>;

  protected successResend$!: Observable<string | undefined>;
  private _unsubscribeAll: Subject<void> = new Subject();
  protected email?: string;

  public formGroup: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _signUpConfirmLogic: SignUpConfirmService,
    private _signUpResendCodeLogic: SignUpResendCodeService,
    private _activatedRoute: ActivatedRoute
  ) {
    this.formGroup = this._fb.group({
      code: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.error$ = merge(
      this._signUpResendCodeLogic.error$,
      this._signUpConfirmLogic.error$
    );
    this.successResend$ = this._signUpResendCodeLogic.success$;
    this.loading$ = merge(
      this._signUpConfirmLogic.loading$,
      this._signUpResendCodeLogic.loading$
    );
    this._activatedRoute.paramMap
      .pipe(
        takeUntil(this._unsubscribeAll),
        map((params) => params.get('email')!)
      )
      .subscribe((email) => (this.email = email));
  }

  submit() {
    if (this.formGroup.valid) {
      this._signUpConfirmLogic.signUpConfirmationCode({
        code: this.formGroup.value.code,
        username: this.email ?? '',
      });
    }
  }
  resendCode() {
    this._signUpResendCodeLogic.resendCode(this.email ?? '');
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
