import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { shareReplay, tap } from 'rxjs';
import { SignUpConfirmService } from 'src/app/logic/auth/sign-up-confirm.service';
import { SignUpService } from 'src/app/logic/auth/sign-up.service';

@Component({
  selector: 'dp-sign-up-confirm',
  templateUrl: './sign-up-confirm.component.html',
})
export class SignUpConfirmComponent {
  protected result$;

  protected loading$;

  public formGroup: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _signUpConfirmLogic: SignUpConfirmService,
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
          this._router.navigate([]);
        }
      }),
      shareReplay(1)
    );
    this.loading$ = this._signUpConfirmLogic.loading$;
  }

  submit() {
    if (this.formGroup.valid) {
      this._signUpConfirmLogic.formGroupValue = this.formGroup.value;
    }
  }
}
