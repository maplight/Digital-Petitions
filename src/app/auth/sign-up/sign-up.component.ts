import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { state, states } from '../../core/states';
import { SignUpService } from 'src/app/logic/auth/exports';
import { shareReplay, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'dp-sign-up',
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent {
  protected localStates: state[] = states;

  protected hidePassword = true;

  protected result$;

  protected loading$;

  public formGroup: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _signUpLogic: SignUpService,
    private _router: Router
  ) {
    this.formGroup = this._fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      aptNumber: ['', [Validators.required]],
      state: [null, [Validators.required]],
      zipCode: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    this.result$ = this._signUpLogic.result$.pipe(
      tap((result) => {
        if (!!result.result) {
          this._router.navigate(['/auth/sign-up', this.formGroup.value.email]);
        }
      }),
      shareReplay(1)
    );
    this.loading$ = this._signUpLogic.loading$;
  }

  submit() {
    if (this.formGroup.valid) {
      this._signUpLogic.formGroupValue(this.formGroup.value);
    }
  }
}
