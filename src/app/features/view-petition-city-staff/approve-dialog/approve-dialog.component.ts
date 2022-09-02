import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { TargetPetitionInput } from 'src/app/core/api/API';
import { ApprovePetitionService } from 'src/app/logic/petition/approve-petition.service';
import { DialogResultComponent } from 'src/app/shared/dialog-result/dialog-result.component';
import { ApproveAlertComponent } from '../approve-alert/approve-alert.component';

@Component({
  selector: 'dp-aprove-dialog',
  templateUrl: './approve-dialog.component.html',
})
export class ApproveDialogComponent implements OnInit {
  protected formGroup: FormGroup;

  protected result$!: Subscription;
  protected error: string | undefined;
  protected loading$!: Observable<boolean>;

  constructor(
    public _dialog: MatDialog,
    private _fb: FormBuilder,
    private _approvePetitionLogic: ApprovePetitionService,
    @Inject(MAT_DIALOG_DATA)
    public data: TargetPetitionInput
  ) {
    this.formGroup = this._fb.group({
      deadline: ['', [Validators.required]],
      signatures: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.result$ = this._approvePetitionLogic.result$.subscribe((result) => {
      if (!!result.result) {
        this._dialog.open(DialogResultComponent, {
          width: '520px',
          data: {
            title: 'Petition Approved!',
            message: '',
            success: true,
          },
        });
      } else {
        this.error = result.error;
      }
    });
    this.loading$ = this._approvePetitionLogic.loading$;
  }

  submit() {
    if (this.formGroup.valid) {
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
