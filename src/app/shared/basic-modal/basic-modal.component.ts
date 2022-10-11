import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'dp-basic-modal',
  templateUrl: './basic-modal.component.html',
})
export class BasicModalComponent {
  constructor(public dialogRef: MatDialogRef<BasicModalComponent>) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  @Output()
  sendEvent = new EventEmitter<void>();

  onSend() {
    this.sendEvent.emit();
  }
}
