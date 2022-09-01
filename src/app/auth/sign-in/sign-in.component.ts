import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { SignInService } from 'src/app/logic/auth/exports';

type SignInForm = {
  email: FormControl<string>;
  password: FormControl<string>;
};

@Component({
  templateUrl: './sign-in.component.html',
  providers: [SignInService],
})
export class SignInComponent implements OnInit {
  protected error$!: Observable<string | undefined>;

  protected formGroup!: FormGroup<SignInForm>;

  protected hidePassword = true;

  protected loading$!: Observable<boolean>;

  constructor(private _fb: FormBuilder, private _signInLogic: SignInService) {}

  ngOnInit(): void {
    this.formGroup = this._fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.error$ = this._signInLogic.error$;

    this.loading$ = this._signInLogic.loading$;
  }

  submit() {
    if (this.formGroup.valid) {
      this._signInLogic.requestSignIn(this.formGroup.getRawValue());
    }
  }
}
