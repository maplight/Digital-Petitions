import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BasicModalComponent } from 'src/app/shared/basic-modal/basic-modal.component';
import { DialogResultComponent } from '../../shared/dialog-result/dialog-result.component';
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
    public dialogRef: MatDialogRef<BasicModalComponent>,
    public dialog: MatDialog
  ) {
    this.formGroup = this.formBuilder.group(this.form_data);
  }

  ngOnInit(): void {}

  onOk() {
    if (this.formGroup.valid) {
      console.log(this.formGroup.value);
      this.dialogRef.close();
      this.openDialog(
        'This is the title',
        'This is a long example text',
        false
      );
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  openDialog(title: string, message: string, success: boolean): void {
    const dialogRef = this.dialog.open(DialogResultComponent, {
      width: '520px',
      data: {
        title: title,
        message: message,
        success: success,
      },
    });
  }
}
