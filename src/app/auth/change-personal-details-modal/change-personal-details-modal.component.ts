import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MatLegacyDialog as MatDialog,
  MatLegacyDialogRef as MatDialogRef,
} from '@angular/material/legacy-dialog';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { ChangePersonalDetailsService } from 'src/app/logic/auth/exports';
import { State, states } from 'src/app/core/states';
import { DialogResultComponent } from 'src/app/shared/dialog-result/dialog-result.component';

import { Router } from '@angular/router';

@Component({
  selector: 'dp-change-personal-details-modal',
  templateUrl: './change-personal-details-modal.component.html',
  providers: [ChangePersonalDetailsService],
})
export class ChangePersonalDetailsModalComponent implements OnInit, OnDestroy {
  protected loading$!: Observable<boolean>;
  private _unsubscribeAll: Subject<void> = new Subject();
  formGroup: FormGroup;
  protected localStates: State[] = states;

  constructor(
    private _fb: FormBuilder,
    public dialogRef: MatDialogRef<ChangePersonalDetailsModalComponent>,
    public dialog: MatDialog,
    private _changePersonalDetailsLogic: ChangePersonalDetailsService,
    private _router: Router
  ) {
    this.formGroup = this._fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      aptNumber: [''],
      city: ['', [Validators.required]],
      state: [null, [Validators.required]],
      zipCode: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this._changePersonalDetailsLogic.success$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this.dialogRef.close();
        this.openDialog('Password Successfully Changed!', '', true);
      });
    this._changePersonalDetailsLogic.error$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((error) => {
        this.dialogRef.close();
        this.openDialog('An error has occurred', error ? error : '', false);
      });
    this.loading$ = this._changePersonalDetailsLogic.loading$;
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
  submit() {
    if (this.formGroup.valid) {
      this._changePersonalDetailsLogic.setPersonalDetailsToUpdate(
        this.formGroup.value
      );
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
