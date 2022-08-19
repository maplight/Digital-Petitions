import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogResultComponent } from 'src/app/shared/dialog-result/dialog-result.component';
import { ApproveAlertComponent } from '../approve-alert/approve-alert.component';

@Component({
  selector: 'dp-aprove-dialog',
  templateUrl: './approve-dialog.component.html',
})
export class ApproveDialogComponent implements OnInit {
  protected formGroup: FormGroup;
  constructor(public _dialog: MatDialog, private _fb: FormBuilder) {
    this.formGroup = this._fb.group({
      deadline: ['', [Validators.required]],
      signatures: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  submit() {
    if (this.formGroup.valid) {
      const dialogRef = this._dialog.open(ApproveAlertComponent, {
        width: '480px',
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          console.log(this.formGroup.value);
          this._dialog.open(DialogResultComponent, {
            width: '520px',
            data: {
              title: 'Petition Approved!',
              message: '',
              success: true,
            },
          });
        } else {
          this._dialog.closeAll();
        }
      });
    } else {
      this.formGroup.markAllAsTouched();
    }
  }
}
