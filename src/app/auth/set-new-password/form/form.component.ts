import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SetNewPasswordForm } from '../set-new-password-form.interface';

@Component({
  selector: 'dp-form',
  templateUrl: './form.component.html',
})
export class FormComponent {
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
  @Output()
  event = new EventEmitter<SetNewPasswordForm>();
  submit() {
    if (this.formGroup.valid) {
      this.event.emit(this.formGroup.value);
    }
  }
}
