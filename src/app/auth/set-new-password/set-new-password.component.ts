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
  constructor() {}

  ngOnInit(): void {}
  ngOnDestroy(): void {}

  submit(formData: SetNewPasswordForm) {}
}
