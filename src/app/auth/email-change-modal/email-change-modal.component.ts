import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmEmailChangeModalComponent } from '../confirm-email-change-modal/confirm-email-change-modal.component';
import { EmailChangeForm } from './email-change-form.interface';

@Component({
  selector: 'dp-email-change-modal',
  templateUrl: './email-change-modal.component.html',
  styleUrls: ['./email-change-modal.component.scss'],
})
export class EmailChangeModalComponent implements OnInit {
  public formGroup: FormGroup;
  public form_data: EmailChangeForm = {
    email: new FormControl('', [Validators.required, Validators.email]),
  };
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EmailChangeModalComponent>,
    public dialog: MatDialog
  ) {
    this.formGroup = this.formBuilder.group(this.form_data);
  }

  ngOnInit(): void {}

  onOk() {
    if (this.formGroup.valid) {
      console.log(this.formGroup.value);
      this.dialogRef.close();
      this.openDialog();
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmEmailChangeModalComponent, {
      width: '690px',
    });
  }
}
