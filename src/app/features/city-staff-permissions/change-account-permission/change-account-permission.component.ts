import { Component, Inject, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { merge, Observable, Subject, takeUntil } from 'rxjs';
import { ChangeAccountPermissionService } from 'src/app/logic/admin/change-account-permission.service';
import { GetAccountPermissionService } from 'src/app/logic/admin/get-account-permission.service';
import { BasicModalComponent } from 'src/app/shared/basic-modal/basic-modal.component';
import { DialogResultComponent } from 'src/app/shared/dialog-result/dialog-result.component';

@Component({
  selector: 'dp-change-account-permission',
  templateUrl: './change-account-permission.component.html',
  providers: [ChangeAccountPermissionService, GetAccountPermissionService],
})
export class ChangeAccountPermissionComponent implements OnInit {
  protected loading$!: Observable<boolean>;
  protected error$!: Observable<string | undefined>;
  private _unsubscribeAll: Subject<void> = new Subject();
  public formGroup: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private dialogRef: MatDialogRef<BasicModalComponent>,
    private dialog: MatDialog,
    private _changeAccountPermissionLogic: ChangeAccountPermissionService,
    private _getAccountPermissionLogic: GetAccountPermissionService,
    @Inject(MAT_DIALOG_DATA)
    public data: { id: string }
  ) {
    this.formGroup = this._fb.group({
      type: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this._changeAccountPermissionLogic.success$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this.dialogRef.close();
        /*
        this.openDialog(
          'Invitation Sent!',
          'Your new member will be able to acees your account once they click on the invitation link and set up their account.',
          true
        );*/
      });
    this._getAccountPermissionLogic.success$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((data) => {
        this.formGroup = this._fb.group({
          type: [data, [Validators.required]],
        });
      });
    this.error$ = merge(
      this._changeAccountPermissionLogic.error$,
      this._getAccountPermissionLogic.error$
    );

    this.loading$ = merge(
      this._changeAccountPermissionLogic.loading$,
      this._getAccountPermissionLogic.loading$
    );
    this._getAccountPermissionLogic.formGroupValue(this.data.id);
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  submit() {
    if (this.formGroup.valid) {
      this._changeAccountPermissionLogic.formGroupValue(this.formGroup.value);
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