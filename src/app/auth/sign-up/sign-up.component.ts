import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { State, states } from '../../core/states';
import { SignUpService } from 'src/app/logic/auth/exports';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ConfirmPasswordValidator } from './password-match';
import { SignUpCredentials } from 'src/app/shared/models/exports';

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
      let _signUpCredentials: SignUpCredentials = {
        firstName: this.formGroup.value.firstName,
        lastName: this.formGroup.value.lastName,
        address: this.formGroup.value.address,
        aptNumber: this.formGroup.value.aptNumber,
        state: this.formGroup.value.state,
        zipCode: this.formGroup.value.zipCode,
        email: this.formGroup.value.email,
        password: this.formGroup.value.password,
      };
      this._signUpLogic.SignUpCredentials(_signUpCredentials);
    }
  }
}
