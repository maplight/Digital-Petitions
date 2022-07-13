import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogResultComponent } from 'src/app/shared/dialog-result/dialog-result.component';
import { ConfirmEmailChangeForm } from './confirm-email-change-form.interface';

@Component({
  selector: 'dp-confirm-email-change-modal',
  templateUrl: './confirm-email-change-modal.component.html',
})
export class ConfirmEmailChangeModalComponent implements OnInit {
  public formGroup: FormGroup;
  public form_data: ConfirmEmailChangeForm = {
    code: new FormControl('', [Validators.required]),
  };
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ConfirmEmailChangeModalComponent>,
    public dialog: MatDialog
  ) {
    this.formGroup = this.formBuilder.group(this.form_data);
  }

  ngOnInit(): void {}

  onOk() {
    if (this.formGroup.valid) {
      console.log(this.formGroup.value);
      this.dialogRef.close();
      this.openDialog('Title', 'This is a long example text', true);
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
