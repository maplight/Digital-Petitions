import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil, tap } from 'rxjs';
import { ChangePersonalDetailsService } from 'src/app/core/application/change-personal-details.service';
import { state, states } from 'src/app/core/states';
import { DialogResultComponent } from 'src/app/shared/dialog-result/dialog-result.component';
import { PersonalDetailsChangeForm } from './personal-details-change-form.interface';

@Component({
  selector: 'dp-change-personal-details-modal',
  templateUrl: './change-personal-details-modal.component.html',
  styleUrls: ['./change-personal-details-modal.component.scss'],
})
export class ChangePersonalDetailsModalComponent implements OnInit {
  protected hide_new_password = true;
  protected hide_old_password = true;
  protected result$;
  protected loading$;
  private _unsubscribeAll: Subject<void> = new Subject();
  protected formGroup: FormGroup;
  protected local_states: state[] = states;

  public form_data: PersonalDetailsChangeForm = {
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    apt_number: new FormControl('', [Validators.required]),
    state: new FormControl<state | null>(null, [Validators.required]),
    zip_code: new FormControl('', [Validators.required]),
  };
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ChangePersonalDetailsModalComponent>,
    public dialog: MatDialog,
    private ChangePersonalDetailsService: ChangePersonalDetailsService
  ) {
    this.formGroup = this.formBuilder.group(this.form_data);
    this.result$ = this.ChangePersonalDetailsService.result$
      .pipe(
        tap((result) => {
          if (!!result.result) {
            this.dialogRef.close();
            this.openDialog(
              'Personal Details Are Successfully Changed!',
              '',
              true
            );
          } else {
            //I'm not sure this is the best way to handle errors here
            this.dialogRef.close();
            this.openDialog(
              'An error has occurred',
              result.error ? result.error : '',
              false
            );
          }
        }),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe();
    this.loading$ = this.ChangePersonalDetailsService.loading$;
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
  submit() {
    if (this.formGroup.valid) {
      this.ChangePersonalDetailsService.formGroupValue = this.formGroup.value;
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
