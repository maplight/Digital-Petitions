import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { ConfirmChangeEmailService } from 'src/app/logic/auth/exports';
import { DialogResultComponent } from 'src/app/shared/dialog-result/dialog-result.component';

@Component({
  selector: 'dp-confirm-email-change-modal',
  templateUrl: './confirm-email-change-modal.component.html',
  providers: [ConfirmChangeEmailService],
})
export class ConfirmEmailChangeModalComponent implements OnInit, OnDestroy {
  protected loading$!: Observable<boolean>;
  private _unsubscribeAll: Subject<void> = new Subject();
  public formGroup: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private dialogRef: MatDialogRef<ConfirmEmailChangeModalComponent>,
    private dialog: MatDialog,
    private _confirmChangeEmailLogic: ConfirmChangeEmailService,
    private _router: Router
  ) {
    this.formGroup = this._fb.group({
      code: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this._confirmChangeEmailLogic.success$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this.dialogRef.close();
        this.openDialog('Password Successfully Changed!', '', true);
      });
    this._confirmChangeEmailLogic.error$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((error) => {
        this.dialogRef.close();
        this.openDialog('An error has occurred', error ? error : '', false);
      });
    this.loading$ = this._confirmChangeEmailLogic.loading$;
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  submit() {
    if (this.formGroup.valid) {
      this._confirmChangeEmailLogic.formGroupValue(this.formGroup.value);
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
