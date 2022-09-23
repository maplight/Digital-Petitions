import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import {
  ApprovePetitionInput,
  TargetPetitionInput,
} from 'src/app/core/api/API';
import { ApprovePetitionService } from 'src/app/logic/petition/approve-petition.service';
import { DialogResultComponent } from 'src/app/shared/dialog-result/dialog-result.component';
import { ApproveAlertComponent } from '../approve-alert/approve-alert.component';

@Component({
  selector: 'dp-aprove-dialog',
  templateUrl: './approve-dialog.component.html',
  providers: [ApprovePetitionService],
})
export class ApproveDialogComponent implements OnInit {
  protected formGroup: FormGroup;

  protected error$!: Observable<string | undefined>;
  protected loading$!: Observable<boolean>;

  constructor(
    public _dialog: MatDialog,
    private _fb: FormBuilder,
    private _approvePetitionLogic: ApprovePetitionService,
    @Inject(MAT_DIALOG_DATA)
    public data: ApprovePetitionInput
  ) {
    this.formGroup = this._fb.group({
      deadline: [Date, [Validators.required]],
      signatures: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }

  ngOnInit(): void {
    this._approvePetitionLogic.success$.subscribe((_) => {
      this._dialog.open(DialogResultComponent, {
        width: '520px',
        data: {
          title: 'Petition Approved!',
          message: '',
          success: true,
        },
      });
    });
    this.loading$ = this._approvePetitionLogic.loading$;
    this.error$ = this._approvePetitionLogic.error$;
  }

  submit() {
    if (this.formGroup.valid) {
      this.data.deadline = this.formGroup.value.deadline;
      this.data.requiredSignatures = this.formGroup.value.signatures;
      const dialogRef = this._dialog.open(ApproveAlertComponent, {
        width: '480px',
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this._approvePetitionLogic.approvePetition(this.data);
        } else {
          this._dialog.closeAll();
        }
      });
    } else {
      this.formGroup.markAllAsTouched();
    }
  }
}
