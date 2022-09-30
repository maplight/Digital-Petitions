import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { ChangePasswordService } from 'src/app/logic/auth/exports';
import { BasicModalComponent } from 'src/app/shared/basic-modal/basic-modal.component';
import { DialogResultComponent } from '../../shared/dialog-result/dialog-result.component';

@Component({
  selector: 'dp-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  providers: [ChangePasswordService],
})
export class ChangePasswordModalComponent implements OnInit, OnDestroy {
  protected hideNewPassword = true;
  protected hideOldPassword = true;
  protected loading$!: Observable<boolean>;
  private _unsubscribeAll: Subject<void> = new Subject();

  public formGroup: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private dialogRef: MatDialogRef<BasicModalComponent>,
    private dialog: MatDialog,
    private _changePasswordLogic: ChangePasswordService
  ) {
    this.formGroup = this._fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this._changePasswordLogic.success$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this.dialogRef.close();
        this.openDialog('Password Successfully Changed!', '', true);
      });
    this._changePasswordLogic.error$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((error) => {
        this.dialogRef.close();
        this.openDialog('An error has occurred', error ?? '', false);
      });
    this.loading$ = this._changePasswordLogic.loading$;
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  submit() {
    if (this.formGroup.valid) {
      this._changePasswordLogic.setPaswwordData(this.formGroup.value);

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
