import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, shareReplay, tap } from 'rxjs';
import { SignInService } from 'src/app/logic/auth/exports';

@Component({
  selector: 'dp-sign-in',
  templateUrl: './sign-in.component.html',
  providers: [SignInService],
})
export class SignInComponent {
  protected hidePassword = true;

  protected error$!: Observable<string | undefined>;

  protected loading$!: Observable<boolean>;

  public formGroup: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _signInLogic: SignInService,
    private _router: Router
  ) {
    this.formGroup = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.error$ = this._signInLogic.error$;

    this.loading$ = this._signInLogic.loading$;
  }

  submit() {
    if (this.formGroup.valid) {
      this._signInLogic.requestSignIn(this.formGroup.value);
    }
  }
}
