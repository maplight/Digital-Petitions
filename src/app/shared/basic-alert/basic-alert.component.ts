import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

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
