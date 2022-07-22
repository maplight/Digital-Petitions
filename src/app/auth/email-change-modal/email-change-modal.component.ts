import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil, tap } from 'rxjs';
import { ChangeEmailService } from 'src/app/application/change-email.service';
import { DialogResultComponent } from 'src/app/shared/dialog-result/dialog-result.component';
import { ConfirmEmailChangeModalComponent } from '../confirm-email-change-modal/confirm-email-change-modal.component';
import { EmailChangeForm } from './email-change-form.interface';

@Component({
  selector: 'dp-email-change-modal',
  templateUrl: './email-change-modal.component.html',
  styleUrls: ['./email-change-modal.component.scss'],
})
export class EmailChangeModalComponent implements OnInit, OnDestroy {
  protected result$;
  protected loading$;
  private _unsubscribeAll: Subject<void> = new Subject();
  public formGroup: FormGroup;
  public form_data: EmailChangeForm = {
    email: new FormControl('', [Validators.required, Validators.email]),
  };
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EmailChangeModalComponent>,
    private dialog: MatDialog,
    private ChangeEmailService: ChangeEmailService
  ) {
    this.formGroup = this.formBuilder.group(this.form_data);
    this.result$ = this.ChangeEmailService.result$
      .pipe(
        tap((result) => {
          if (!!result.result) {
            this.dialogRef.close();
            this.openDialog();
          } else {
            //I'm not sure this is the best way to handle errors here
            this.dialogRef.close();
            this.openErrorDialog(
              'An error has occurred',
              result.error ? result.error : '',
              false
            );
          }
        }),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe();
    this.loading$ = this.ChangeEmailService.loading$;
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  submit() {
    if (this.formGroup.valid) {
      this.ChangeEmailService.formGroupValue = this.formGroup.value;
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmEmailChangeModalComponent, {
      width: '690px',
    });
  }
  openErrorDialog(title: string, message: string, success: boolean): void {
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
