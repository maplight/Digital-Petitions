import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'dp-basic-alert',
  templateUrl: './basic-alert.component.html',
})
export class BasicAlertComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<BasicAlertComponent>) {}

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
