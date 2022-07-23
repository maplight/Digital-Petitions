import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subject, tap } from 'rxjs';
import { ForgotPasswordService } from 'src/app/logic/auth/exports';
import { AccountService } from '../account-service/account.service';
import { ForgotPasswordForm } from './forgot-password-form.interface';

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
  public form_data: ForgotPasswordForm = {
    email: new FormControl('', [Validators.required, Validators.email]),
  };
  constructor(
    private formBuilder: FormBuilder,
    private ForgotPasswordService: ForgotPasswordService,
    private AccountService: AccountService
  ) {
    this.formGroup = this.formBuilder.group(this.form_data);
    this.result$ = this.ForgotPasswordService.result$.pipe(
      tap((result) => {
        if (!!result.result) {
          /*redirect*/
          AccountService.updateUser(true);
        }
      })
    );
    this.loading$ = this.ForgotPasswordService.loading$;
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  submit() {
    if (this.formGroup.valid) {
      this.ForgotPasswordService.formGroupValue = this.formGroup.value;
    }
  }
}
