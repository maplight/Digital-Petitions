import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { state, states } from 'src/app/core/states';
import { DialogResultComponent } from 'src/app/shared/dialog-result/dialog-result.component';
import { PersonalDetailsChangeForm } from './personal-details-change-form.interface';

@Component({
  selector: 'dp-change-personal-details-modal',
  templateUrl: './change-personal-details-modal.component.html',
  styleUrls: ['./change-personal-details-modal.component.scss'],
})
export class ChangePersonalDetailsModalComponent implements OnInit {
  protected formGroup: FormGroup;
  protected local_states: state[] = states;

  public form_data: PersonalDetailsChangeForm = {
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    apt_number: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl<state | null>(null, [Validators.required]),
    zip_code: new FormControl('', [Validators.required]),
  };
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ChangePersonalDetailsModalComponent>,
    public dialog: MatDialog
  ) {
    this.formGroup = this.formBuilder.group(this.form_data);
  }

  ngOnInit(): void {}

  onOk() {
    if (this.formGroup.valid) {
      console.log(this.formGroup.value);
      this.dialogRef.close();
      this.openDialog('Title', 'This is a long example text', true);
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  openDialog(title: string, message: string, success: boolean): void {
    const dialogRef = this.dialog.open(DialogResultComponent, {
      width: '520px',
      data: {
        title: title,
        message: message,
        success: success,
      },
    });
  }
}
