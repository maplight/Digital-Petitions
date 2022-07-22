import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil, tap } from 'rxjs';
import { ChangePasswordService } from 'src/app/application/change-password.service';
import { BasicModalComponent } from 'src/app/shared/basic-modal/basic-modal.component';
import { DialogResultComponent } from '../../shared/dialog-result/dialog-result.component';
import { AccountService } from '../account-service/account.service';
import { ChangePasswordForm } from './change-password-form.interface';

@Component({
  selector: 'dp-change-password-modal',
  templateUrl: './change-password-modal.component.html',
})
export class ChangePasswordModalComponent implements OnInit, OnDestroy {
  protected hide_new_password = true;
  protected hide_old_password = true;
  protected result$;
  protected loading$;
  private _unsubscribeAll: Subject<void> = new Subject();

  public formGroup: FormGroup;
  public form_data: ChangePasswordForm = {
    old_password: new FormControl('', [Validators.required]),
    new_password: new FormControl('', [Validators.required]),
  };
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<BasicModalComponent>,
    private dialog: MatDialog,
    private ChangePasswordService: ChangePasswordService,
    private AccountService: AccountService
  ) {
    this.formGroup = this.formBuilder.group(this.form_data);
    this.result$ = this.ChangePasswordService.result$
      .pipe(
        tap((result) => {
          if (!!result.result) {
            this.dialogRef.close();
            this.openDialog('Password Successfully Changed!', '', true);
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
    this.loading$ = this.ChangePasswordService.loading$;
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  submit() {
    if (this.formGroup.valid) {
      this.ChangePasswordService.formGroupValue = this.formGroup.value;
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
