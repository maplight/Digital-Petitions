import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil, tap } from 'rxjs';
import { ConfirmChangeEmailService } from 'src/app/application/confirm-change-email.service';
import { DialogResultComponent } from 'src/app/shared/dialog-result/dialog-result.component';
import { AccountService } from '../account-service/account.service';
import { ConfirmEmailChangeForm } from './confirm-email-change-form.interface';

@Component({
  selector: 'dp-confirm-email-change-modal',
  templateUrl: './confirm-email-change-modal.component.html',
})
export class ConfirmEmailChangeModalComponent implements OnInit, OnDestroy {
  protected result$;
  protected loading$;
  private _unsubscribeAll: Subject<void> = new Subject();
  public formGroup: FormGroup;
  public form_data: ConfirmEmailChangeForm = {
    code: new FormControl('', [Validators.required]),
  };
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ConfirmEmailChangeModalComponent>,
    private dialog: MatDialog,
    private ConfirmChangeEmailService: ConfirmChangeEmailService,
    private AccountService: AccountService
  ) {
    this.formGroup = this.formBuilder.group(this.form_data);
    this.result$ = this.ConfirmChangeEmailService.result$
      .pipe(
        tap((result) => {
          if (!!result.result) {
            this.dialogRef.close();
            this.openDialog('Email Successfully Changed!', '', true);
            AccountService.updateUser(true);
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
    this.loading$ = this.ConfirmChangeEmailService.loading$;
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  submit() {
    if (this.formGroup.valid) {
      this.ConfirmChangeEmailService.formGroupValue = this.formGroup.value;
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
