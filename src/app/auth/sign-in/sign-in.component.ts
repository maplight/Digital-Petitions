import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  combineLatest,
  map,
  Observable,
  shareReplay,
  startWith,
  take,
  tap,
} from 'rxjs';
import {
  CompleteNewPasswordService,
  SignInService,
} from 'src/app/logic/auth/exports';
import { Attributes, CognitoUserFacade } from 'src/app/shared/models/auth/user';

type SignInForm = {
  email: FormControl<string>;
  password: FormControl<string>;
};

type ViewState = 'LOGIN' | 'CHANGE_PASSWORD';

@Component({
  templateUrl: './sign-in.component.html',
  providers: [SignInService, CompleteNewPasswordService],
})
export class SignInComponent implements OnInit {
  protected formGroup!: FormGroup<SignInForm>;

  protected hidePassword = true;

  protected loading$!: Observable<boolean>;

  protected viewState$!: Observable<ViewState>;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    protected _signInLogic: SignInService,
    protected _completeNewPasswordLogic: CompleteNewPasswordService
  ) {}

  ngOnInit(): void {
    this.formGroup = this._fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.loading$ = combineLatest([
      this._signInLogic.loading$.pipe(startWith(false)),
      this._completeNewPasswordLogic.loading$.pipe(startWith(false)),
    ]).pipe(
      map(
        ([signInLoading, setNewPasswordLoading]) =>
          signInLoading || setNewPasswordLoading
      ),
      shareReplay(1)
    );

    this.viewState$ = this._signInLogic.success$.pipe(
      tap((value) => this.onSuccess(value)),
      map((value: CognitoUserFacade) =>
        value?.challengeName === 'NEW_PASSWORD_REQUIRED'
          ? 'CHANGE_PASSWORD'
          : 'LOGIN'
      ),
      startWith('LOGIN' as ViewState),
      shareReplay(1)
    );

    this._completeNewPasswordLogic.success$
      .pipe(take(1))
      .subscribe((user) => (user ? this.onSuccess(user!) : undefined));
  }

  submit() {
    if (this.formGroup.valid) {
      this._signInLogic.requestSignIn(this.formGroup.getRawValue());
    }
  }

  onChangePassword({ password }: { password: string | null }): void {
    this._completeNewPasswordLogic.setNewPassword(password!);
  }

  private readonly onSuccess = (
    value?: { attributes: Attributes } | CognitoUserFacade
  ): void => {
    switch (value?.attributes?.['custom:access_group']) {
      case 'petitioner':
        this._router.navigate(['/committee/home']);
        break;
      case 'admin':
        this._router.navigate(['/city-staff/home']);
        break;
      //You must add as many conditions as there are roles
    }
  };
}
