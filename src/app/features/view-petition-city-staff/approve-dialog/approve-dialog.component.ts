import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatLegacyDialog as MatDialog,
  MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA,
} from '@angular/material/legacy-dialog';
import { Observable } from 'rxjs';
import {
  ApprovePetitionInput,
  CandidatePetition,
  IssuePetition,
} from 'src/app/core/api/API';
import { ApprovePetitionService } from 'src/app/logic/petition/approve-petition.service';
import { DialogResultComponent } from 'src/app/shared/dialog-result/dialog-result.component';
import { DateValidators } from 'src/app/shared/validators/date-validators';
import { ApproveAlertComponent } from '../approve-alert/approve-alert.component';

@Component({
  selector: 'dp-aprove-dialog',
  templateUrl: './approve-dialog.component.html',
  providers: [ApprovePetitionService],
})
export class ApproveDialogComponent implements OnInit {
  formGroup: FormGroup;

  protected error$!: Observable<string | undefined>;
  protected loading$!: Observable<boolean>;

  constructor(
    public _dialog: MatDialog,
    private _fb: FormBuilder,
    private _approvePetitionLogic: ApprovePetitionService,
    @Inject(MAT_DIALOG_DATA)
    public data: CandidatePetition | IssuePetition
  ) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    this.formGroup = this._fb.group({
      deadline: [
        null,
        [Validators.required, DateValidators.greaterThan(today)],
      ],
      requiredSignatures: ['', [Validators.required]],
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
      this.data = (_?.dataCandidate ?? _?.dataIssue)!;
    });
    this.loading$ = this._approvePetitionLogic.loading$;
    this.error$ = this._approvePetitionLogic.error$;
  }

  submit() {
    if (this.formGroup.valid) {
      const input = { ...this.formGroup.value } as ApprovePetitionInput;
      input.PK = this.data.PK;
      input.expectedVersion = this.data.version;

      const dialogRef = this._dialog.open(ApproveAlertComponent, {
        width: '480px',
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this._approvePetitionLogic.approvePetition(input);
        } else {
          this._dialog.closeAll();
        }
      });
    } else {
      this.formGroup.markAllAsTouched();
    }
  }
}
