import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { merge, Observable, shareReplay, tap } from 'rxjs';
import { SignUpConfirmService } from 'src/app/logic/auth/sign-up-confirm.service';
import { SignUpResendCodeService } from 'src/app/logic/auth/sign-up-resend-code.service';
import { SignUpService } from 'src/app/logic/auth/sign-up.service';

@Component({
  selector: 'dp-sign-up-confirm',
  templateUrl: './sign-up-confirm.component.html',
  providers: [SignUpConfirmService],
})
export class SignUpConfirmComponent implements OnInit {
  protected error$!: Observable<string | undefined>;

  protected loading$!: Observable<boolean>;

  protected successResend$!: Observable<string | undefined>;

  public formGroup: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _signUpConfirmLogic: SignUpConfirmService,
    private _signUpResendCodeLogic: SignUpResendCodeService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this.formGroup = this._fb.group({
      code: ['', [Validators.required]],
      username: [this._activatedRoute.snapshot.params['email']],
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
  }

  submit() {
    if (this.formGroup.valid) {
      this._signUpConfirmLogic.formGroupValue(this.formGroup.value);
    }
  }
  resendCode() {
    this._signUpResendCodeLogic.formGroupValue(
      this._activatedRoute.snapshot.params['email']
    );
  }
}
