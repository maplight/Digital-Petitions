import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'dp-basic-modal',
  templateUrl: './basic-modal.component.html',
})
export class BasicModalComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<BasicModalComponent>) {}

  ngOnInit(): void {}

  onCancelClick(): void {
    this.dialogRef.close();
  }
  @Input()
  id_form: string = '';

  @Output()
  event = new EventEmitter<void>();

  onSend() {
    this.event.emit();
  }
}
