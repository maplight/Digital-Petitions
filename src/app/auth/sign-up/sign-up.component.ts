import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

import { State, states } from '../../core/states';
import { SignUpService } from 'src/app/logic/auth/exports';
import { Observable, shareReplay, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ConfirmPasswordValidator } from './password-match';

@Component({
  selector: 'dp-sign-up',
  templateUrl: './sign-up.component.html',
  providers: [SignUpService],
})
export class SignUpComponent implements OnInit {
  protected localStates: State[] = states;

  protected hidePassword = true;
  protected hidecPassword = true;

  protected error$!: Observable<string | undefined>;

  protected loading$!: Observable<boolean>;

  public formGroup: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _signUpLogic: SignUpService,
    private _router: Router
  ) {
    this.formGroup = this._fb.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        address: ['', [Validators.required]],
        city: ['', [Validators.required]],
        aptNumber: [''],
        state: [null, [Validators.required]],
        zipCode: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        cpassword: ['', [Validators.required]],
      },
      {
        validator: ConfirmPasswordValidator('password', 'cpassword'),
      }
    );
  }
  ngOnInit(): void {
    this.error$ = this._signUpLogic.error$;
    this.loading$ = this._signUpLogic.loading$;
  }

  submit() {
    if (this.formGroup.valid) {
      this._signUpLogic.SignUpCredentials(this.formGroup.value);
    }
  }
}
