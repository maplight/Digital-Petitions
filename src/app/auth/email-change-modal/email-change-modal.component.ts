import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { DialogResultComponent } from 'src/app/shared/dialog-result/dialog-result.component';
import { ConfirmEmailChangeModalComponent } from '../confirm-email-change-modal/confirm-email-change-modal.component';
import { ChangeEmailService } from 'src/app/logic/auth/exports';

@Component({
  selector: 'dp-email-change-modal',
  templateUrl: './email-change-modal.component.html',
  providers: [ChangeEmailService],
})
export class EmailChangeModalComponent implements OnInit, OnDestroy {
  protected loading$!: Observable<boolean>;
  private _unsubscribeAll: Subject<void> = new Subject();
  public formGroup: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private dialogRef: MatDialogRef<EmailChangeModalComponent>,
    private dialog: MatDialog,
    private _changeEmailLogic: ChangeEmailService
  ) {
    this.formGroup = this._fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  ngOnInit(): void {
    this._changeEmailLogic.success$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this.dialogRef.close();
        this.openSuccessDialog();
      });
    this._changeEmailLogic.error$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((error) => {
        this.dialogRef.close();
        this.openErrorDialog(
          'An error has occurred',
          error ? error : '',
          false
        );
      });
    this.loading$ = this._changeEmailLogic.loading$;
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  submit() {
    if (this.formGroup.valid) {
      this._changeEmailLogic.formGroupValue(this.formGroup.value);
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  openSuccessDialog(): void {
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
