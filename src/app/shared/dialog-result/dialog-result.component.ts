import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'dp-change-password-result',
  templateUrl: './dialog-result.component.html',
})
export class DialogResultComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogResultComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { title: string; message: string; success: boolean }
  ) {}

  ngOnInit(): void {}

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
