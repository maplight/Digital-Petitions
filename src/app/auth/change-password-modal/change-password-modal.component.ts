import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BasicModalComponent } from 'src/app/shared/basic-modal/basic-modal.component';
import { ChangePasswordForm } from './change-password-form.interface';

@Component({
  selector: 'dp-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./change-password-modal.component.scss'],
})
export class ChangePasswordModalComponent implements OnInit {
  protected hide_new_password = true;
  protected hide_old_password = true;
  protected id_form = 'dp-change-password-form';

  public formGroup: FormGroup;
  public form_data: ChangePasswordForm = {
    old_password: new FormControl('', [Validators.required]),
    new_password: new FormControl('', [Validators.required]),
  };
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<BasicModalComponent>
  ) {
    this.formGroup = this.formBuilder.group(this.form_data);
  }

  ngOnInit(): void {}

  onOk() {
    if (this.formGroup.valid) {
      console.log(this.formGroup.value);
      this.dialogRef.close();
    } else {
      this.formGroup.markAllAsTouched();
    }
  }
}
