import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'dp-basic-alert',
  templateUrl: './basic-alert.component.html',
})
export class BasicAlertComponent {
  constructor(public dialogRef: MatDialogRef<BasicAlertComponent>) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
