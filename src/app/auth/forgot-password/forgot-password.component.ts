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
import { ForgotPasswordForm } from './forgot-password-form.interface';

@Component({
  selector: 'dp-forgot-password',
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  protected hide_password = true;

  public formGroup: FormGroup;
  public form_data: ForgotPasswordForm = {
    email: new FormControl('', [Validators.required, Validators.email]),
  };
  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group(this.form_data);
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {}

  submit() {
    if (this.formGroup.valid) {
      //call service
    }
  }
}
