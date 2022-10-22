import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject, tap } from 'rxjs';
import { ForgotPasswordService } from 'src/app/logic/auth/exports';

@Component({
  selector: 'dp-forgot-password',
  templateUrl: './forgot-password.component.html',
  providers: [ForgotPasswordService],
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  protected error$!: Observable<string | undefined>;
  protected loading$!: Observable<boolean>;
  private _unsubscribeAll: Subject<void> = new Subject();

  public formGroup: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _forgotPasswordLogic: ForgotPasswordService,
    private _router: Router
  ) {
    this.formGroup = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.error$ = this._forgotPasswordLogic.error$;
    this.loading$ = this._forgotPasswordLogic.loading$;
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  submit() {
    if (this.formGroup.valid) {
      this._forgotPasswordLogic.recoverPasswordData(this.formGroup.value);
    }
  }
}
