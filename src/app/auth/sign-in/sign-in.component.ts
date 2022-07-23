import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { shareReplay, Subject, tap } from 'rxjs';
import { SignInService } from 'src/app/logic/auth/exports';

@Component({
  selector: 'dp-sign-in',
  templateUrl: './sign-in.component.html',
})
export class SignInComponent implements OnInit, OnDestroy {
  protected hidePassword = true;

  protected result$;

  protected loading$;

  private _unsubscribeAll: Subject<void> = new Subject();

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

    this.result$ = this._signInLogic.result$.pipe(
      tap((result) => {
        if (!!result.result) {
          // on success redirect the user to the home page
          // TODO - create a landing route that later redirects based on the user's role
          this._router.navigate([]);
        }
      }),
      shareReplay(1)
    );

    this.loading$ = this._signInLogic.loading$;
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  submit() {
    if (this.formGroup.valid) {
      this._signInLogic.requestSignIn(this.formGroup.value);
    }
  }
}
