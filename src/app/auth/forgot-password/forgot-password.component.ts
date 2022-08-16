import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, tap } from 'rxjs';
import { ForgotPasswordService } from 'src/app/logic/auth/exports';

@Component({
  selector: 'dp-forgot-password',
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  protected hide_password = true;

  protected result$;
  protected loading$;
  private _unsubscribeAll: Subject<void> = new Subject();

  public formGroup: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _forgotPasswordLogic: ForgotPasswordService,
    private _router: Router
  ) {
    this.formGroup = this._fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
    this.result$ = this._forgotPasswordLogic.result$.pipe(
      tap((result) => {
        if (!!result.result) {
          this._router.navigate([
            '/auth/set-new-password',
            this.formGroup.value.email,
          ]);
        }
      })
    );
    this.loading$ = this._forgotPasswordLogic.loading$;
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  submit() {
    if (this.formGroup.valid) {
      this._forgotPasswordLogic.formGroupValue(this.formGroup.value);
    }
  }
}
