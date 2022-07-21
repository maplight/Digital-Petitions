import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subject, tap } from 'rxjs';
import { SignInService } from 'src/app/core/application/sign-in.service';
import { AccountService } from '../account-service/account.service';
import { SignInForm } from './sign-in-form.interface';

@Component({
  selector: 'dp-sign-in',
  templateUrl: './sign-in.component.html',
})
export class SignInComponent implements OnInit, OnDestroy {
  protected hide_password = true;

  protected result$;
  protected loading$;
  private _unsubscribeAll: Subject<void> = new Subject();

  public formGroup: FormGroup;
  public form_data: SignInForm = {
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  };
  constructor(
    private formBuilder: FormBuilder,
    private SignInService: SignInService,
    private AccountService: AccountService
  ) {
    this.formGroup = this.formBuilder.group(this.form_data);
    this.result$ = this.SignInService.result$.pipe(
      tap((result) => {
        if (!!result.result) {
          /*redirect*/
          AccountService.updateUser(true);
        }
      })
    );
    this.loading$ = this.SignInService.loading$;
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  submit() {
    if (this.formGroup.valid) {
      this.SignInService.formGroupValue = this.formGroup.value;
    }
  }
}
