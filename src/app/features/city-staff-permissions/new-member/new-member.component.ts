import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { Observable, Subject, takeUntil } from 'rxjs';
import { StaffAccessLevel } from 'src/app/core/api/API';

import { NewMemberService } from 'src/app/logic/admin/new-member.service';

import { ChangePasswordService } from 'src/app/logic/auth/change-password.service';
import { BasicModalComponent } from 'src/app/shared/basic-modal/basic-modal.component';
import { DialogResultComponent } from 'src/app/shared/dialog-result/dialog-result.component';

@Component({
  selector: 'dp-new-member',
  templateUrl: './new-member.component.html',

  providers: [NewMemberService],
})
export class NewMemberComponent implements OnInit {
  protected loading$!: Observable<boolean>;
  protected error$!: Observable<string | undefined>;

  private _unsubscribeAll: Subject<void> = new Subject();

  public formGroup: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private dialogRef: MatDialogRef<BasicModalComponent>,

    private dialog: MatDialog,
    private _newMemberLogic: NewMemberService
  ) {
    this.formGroup = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      permissions: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this._newMemberLogic.success$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this.dialogRef.close();
        this.openDialog(
          'Invitation Sent!',
          'Your new member will be able to access the system once they click on the invitation link and set up their account.',
          true
        );
      });
    this.error$ = this._newMemberLogic.error$;

    this.loading$ = this._newMemberLogic.loading$;
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  submit() {
    if (this.formGroup.valid) {
      this._newMemberLogic.newStaffUser(this.formGroup.value);
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
