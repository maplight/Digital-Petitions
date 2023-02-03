import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { ChangePersonalDetailsService } from 'src/app/logic/auth/exports';
import { State, states } from 'src/app/core/states';
import { DialogResultComponent } from 'src/app/shared/dialog-result/dialog-result.component';

import { Router } from '@angular/router';
import { AccountService } from 'src/app/core/account-service/account.service';

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
    private _router: Router,
    private _accountLogic: AccountService
  ) {
    console.log(_accountLogic.currentUser?.attributes.address);

    this.formGroup = this._fb.group({
      firstName: [
        _accountLogic.currentUser?.attributes.given_name,
        [Validators.required],
      ],
      lastName: [
        _accountLogic.currentUser?.attributes.family_name,
        [Validators.required],
      ],
      address: [
        JSON.parse(
          _accountLogic.currentUser?.attributes.address ?? '{address:""}'
        ).address,
        [Validators.required],
      ],
      aptNumber: [
        JSON.parse(
          _accountLogic.currentUser?.attributes.address ?? '{aptNumber:""}'
        ).aptNumber,
      ],
      city: [
        JSON.parse(_accountLogic.currentUser?.attributes.address ?? '{city:""}')
          .city,
        [Validators.required],
      ],
      state: [
        (
          JSON.parse(
            _accountLogic.currentUser?.attributes.address ?? '{state:null}'
          ).state as State
        ).value,
        [Validators.required],
      ],
      zipCode: [
        JSON.parse(
          _accountLogic.currentUser?.attributes.address ?? '{zipCode:""}'
        ).zipCode,
        [Validators.required],
      ],
    });
  }

  ngOnInit(): void {
    this._changePersonalDetailsLogic.success$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this.dialogRef.close();
        this.openDialog('Personal Data successfully changed!', '', true);
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
