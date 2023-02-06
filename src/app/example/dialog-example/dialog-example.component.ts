import { Component, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

@Component({
  selector: 'dp-dialog-example',
  templateUrl: './dialog-example.component.html',
})
export class DialogExampleComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DialogExampleComponent>) {}

  ngOnInit(): void {}

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
