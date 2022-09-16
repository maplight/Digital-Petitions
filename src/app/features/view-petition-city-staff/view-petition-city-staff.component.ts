import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  Subject,
  Subscription,
  takeUntil,
  tap,
} from 'rxjs';
import {
  CandidatePetition,
  IssuePetition,
  Petition,
  PetitionStatus,
  TargetPetitionInput,
} from 'src/app/core/api/API';
import { ApprovePetitionService } from 'src/app/logic/petition/approve-petition.service';
import { DenyPetitionService } from 'src/app/logic/petition/deny-petition.service';
import { GetPublicPetitionService } from 'src/app/logic/petition/get-public-petition.service';
import { DialogResultComponent } from 'src/app/shared/dialog-result/dialog-result.component';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';
import { ApproveDialogComponent } from './approve-dialog/approve-dialog.component';
import { DenyAlertComponent } from './deny-alert/deny-alert.component';

@Component({
  selector: 'dp-view-petition-city-staff',
  templateUrl: './view-petition-city-staff.component.html',
})
export class ViewPetitionCityStaffComponent implements OnInit {
  protected success$!: Observable<ResponsePetition | undefined>;
  protected error$!: Observable<string | undefined>;
  protected loading$!: Observable<boolean>;

  protected loadingDeny$!: Observable<boolean>;

  private _unSuscribeAll: Subject<void> = new Subject();
  private _targetPetitionInput: TargetPetitionInput = {
    PK: '',
    expectedVersion: 0,
  };
  constructor(
    private _getPetitionLogic: GetPublicPetitionService,
    private _denyPetitionLogic: DenyPetitionService,
    private _dialog: MatDialog,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.success$ = this._getPetitionLogic.success$;
    this.success$.pipe(takeUntil(this._unSuscribeAll)).subscribe((value) => {
      if (value?.dataCandidate) {
        this._targetPetitionInput.PK = value.dataCandidate.PK;
        this._targetPetitionInput.expectedVersion = value.dataCandidate.version;
      }
      if (value?.dataIssue) {
        this._targetPetitionInput.PK = value.dataIssue.PK;
        this._targetPetitionInput.expectedVersion = value.dataIssue.version;
      }
    });
    this.error$ = this._getPetitionLogic.error$;
    this.loading$ = this._getPetitionLogic.loading$;

    //Deny
    this._denyPetitionLogic.success$
      .pipe(takeUntil(this._unSuscribeAll))
      .subscribe((_) => {
        this.openDialog(true);
      });
    this._denyPetitionLogic.error$
      .pipe(takeUntil(this._unSuscribeAll))
      .subscribe((error) => {
        this.openDialog(false, error);
      });
    this.loadingDeny$ = this._denyPetitionLogic.loading$;

    this._getPetitionLogic.getPetition(
      this._activatedRoute.snapshot.params['id']
    );
  }

  approveDialog(): void {
    const dialogRef = this._dialog.open(ApproveDialogComponent, {
      width: '690px',
      data: this._targetPetitionInput,
    });
  }

  private openDialog(status: boolean, message?: string) {
    this._dialog.open(DialogResultComponent, {
      width: '520px',
      data: {
        title: status ? 'Petition Denied!' : 'An error has occurred!',
        message: message,
        success: status,
      },
    });
  }

  denyAlert() {
    const dialogRef = this._dialog.open(DenyAlertComponent, {
      width: '480px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._denyPetitionLogic.denyPetition(this._targetPetitionInput);
      } else {
        this._dialog.closeAll();
      }
    });
  }
}
