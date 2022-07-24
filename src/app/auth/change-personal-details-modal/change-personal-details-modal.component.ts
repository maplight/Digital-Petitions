import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil, tap } from 'rxjs';
import { ChangePersonalDetailsService } from 'src/app/logic/auth/exports';
import { state, states } from 'src/app/core/states';
import { DialogResultComponent } from 'src/app/shared/dialog-result/dialog-result.component';

import { Router } from '@angular/router';

@Component({
  selector: 'dp-change-personal-details-modal',
  templateUrl: './change-personal-details-modal.component.html',
  styleUrls: ['./change-personal-details-modal.component.scss'],
})
export class ChangePersonalDetailsModalComponent implements OnInit, OnDestroy {
  protected result$;
  protected loading$;
  private _unsubscribeAll: Subject<void> = new Subject();
  protected formGroup: FormGroup;
  protected localStates: state[] = states;

  constructor(
    private _fb: FormBuilder,
    public dialogRef: MatDialogRef<ChangePersonalDetailsModalComponent>,
    public dialog: MatDialog,
    private _changePersonalDetailsLogic: ChangePersonalDetailsService,
    private _router: Router
  ) {
    this.formGroup = this._fb.group({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      apt_number: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl<state | null>(null, [Validators.required]),
      zip_code: new FormControl('', [Validators.required]),
    });
    this.result$ = this._changePersonalDetailsLogic.result$
      .pipe(
        tap((result) => {
          if (!!result.result) {
            this.dialogRef.close();
            this.openDialog(
              'Personal Details Are Successfully Changed!',
              '',
              true
            );
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
    this.loading$ = this._changePersonalDetailsLogic.loading$;
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
  submit() {
    if (this.formGroup.valid) {
      this._changePersonalDetailsLogic.formGroupValue = this.formGroup.value;
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
