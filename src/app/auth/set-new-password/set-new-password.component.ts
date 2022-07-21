import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SetNewPasswordForm } from './set-new-password-form.interface';

@Component({
  selector: 'dp-set-new-password',
  templateUrl: './set-new-password.component.html',
})
export class SetNewPasswordComponent implements OnInit, OnDestroy {
  protected hideConfirmPassword = true;
  protected password = true;

  public formGroup: FormGroup;
  public form_data: SetNewPasswordForm = {
    newPassword: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
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
