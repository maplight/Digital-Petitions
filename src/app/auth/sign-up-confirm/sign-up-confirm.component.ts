import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { merge, shareReplay, tap } from 'rxjs';
import { SignUpConfirmService } from 'src/app/logic/auth/sign-up-confirm.service';
import { SignUpResendCodeService } from 'src/app/logic/auth/sign-up-resend-code.service';
import { SignUpService } from 'src/app/logic/auth/sign-up.service';

@Component({
  selector: 'dp-sign-up-confirm',
  templateUrl: './sign-up-confirm.component.html',
})
export class SignUpConfirmComponent {
  protected result$;

  protected loading$;

  protected resultResend$;

  public formGroup: FormGroup;

  protected message =
    'We’ve sent a confirmation code to the new email address. Enter the code to confirm your new account';

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
    this.result$ = this._signUpConfirmLogic.result$.pipe(
      tap((result) => {
        if (!!result.result) {
          this._router.navigate(['/committee/account-settings']);
        }
      }),
      shareReplay(1)
    );

    //logic for resend code
    this.resultResend$ = this._signUpResendCodeLogic.result$.pipe(
      tap((result) => {
        if (!!result.result) {
          this.message = 'A new code has been sent to your email';
        }
      }),
      shareReplay(1)
    );

    this.loading$ = merge(
      this._signUpConfirmLogic.loading$,
      this._signUpResendCodeLogic.loading$
    );
  }

  submit() {
    if (this.formGroup.valid) {
      this._signUpConfirmLogic.formGroupValue = this.formGroup.value;
    }
  }
  resendCode() {
    this._signUpResendCodeLogic.formGroupValue =
      this._activatedRoute.snapshot.params['email'];
  }
}
