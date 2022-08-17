import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject, takeUntil, tap } from 'rxjs';
import { ChangePasswordService } from 'src/app/logic/auth/exports';
import { BasicModalComponent } from 'src/app/shared/basic-modal/basic-modal.component';
import { DialogResultComponent } from '../../shared/dialog-result/dialog-result.component';

@Component({
  selector: 'dp-change-password-modal',
  templateUrl: './change-password-modal.component.html',
})
export class ChangePasswordModalComponent implements OnInit, OnDestroy {
  protected hideNewPassword = true;
  protected hideOldPassword = true;
  protected result$;
  protected loading$;
  private _unsubscribeAll: Subject<void> = new Subject();

  public formGroup: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private dialogRef: MatDialogRef<BasicModalComponent>,
    private dialog: MatDialog,
    private _changePasswordLogic: ChangePasswordService,
    private _router: Router
  ) {
    this.formGroup = this._fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
    });
    this.result$ = this._changePasswordLogic.result$
      .pipe(
        tap((result) => {
          if (!!result.result) {
            this.dialogRef.close();
            this.openDialog('Password Successfully Changed!', '', true);
            this._router.navigate([]);
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
    this.loading$ = this._changePasswordLogic.loading$;
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  submit() {
    if (this.formGroup.valid) {
      this._changePasswordLogic.formGroupValue(this.formGroup.value);
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
