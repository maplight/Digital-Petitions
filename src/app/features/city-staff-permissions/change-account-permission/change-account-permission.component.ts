import { Component, Inject, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { merge, Observable, Subject, takeUntil } from 'rxjs';
import { AccessLevel } from 'src/app/core/api/API';
import { ChangeAccountPermissionService } from 'src/app/logic/admin/change-account-permission.service';
import { BasicModalComponent } from 'src/app/shared/basic-modal/basic-modal.component';

@Component({
  selector: 'dp-change-account-permission',
  templateUrl: './change-account-permission.component.html',
  providers: [ChangeAccountPermissionService],
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
    @Inject(MAT_DIALOG_DATA)
    public data: { id: string; access: AccessLevel }
  ) {
    this.formGroup = this._fb.group({
      type: [this.data.access, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this._changeAccountPermissionLogic.success$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this.dialogRef.close();
      });

    this.error$ = this._changeAccountPermissionLogic.error$;

    this.loading$ = this._changeAccountPermissionLogic.loading$;
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  submit() {
    if (this.formGroup.valid) {
      this._changeAccountPermissionLogic.updateUserAccessInput({
        username: this.data.id,
        permissions: this.formGroup.value.type,
      });
    } else {
      this.formGroup.markAllAsTouched();
    }
  }
}
