import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'dp-change-password-result',
  templateUrl: './dialog-result.component.html',
})
export class DialogResultComponent {
  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: { title: string; message: string; success: boolean }
  ) {}
}
