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
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      apt_number: new FormControl('', [Validators.required]),
      state: new FormControl<state | null>(null, [Validators.required]),
      zip_code: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
    this.result$ = this._signUpLogic.result$.pipe(
      tap((result) => {
        if (!!result.result) {
          /*redirect*/
          this._router.navigate([]);
        }
      }),
      shareReplay(1)
    );
    this.loading$ = this._signUpLogic.loading$;
  }

  submit() {
    if (this.formGroup.valid) {
      this._signUpLogic.formGroupValue = this.formGroup.value;
    }
  }
}
