import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CandidatePetition, IssuePetition } from 'src/app/core/api/API';
import { DenyPetitionService } from 'src/app/logic/petition/deny-petition.service';
import { GetStaffPetitionService } from 'src/app/logic/petition/get-staff-petition.service';
import { DialogResultComponent } from 'src/app/shared/dialog-result/dialog-result.component';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';
import { ApproveDialogComponent } from './approve-dialog/approve-dialog.component';
import { DenyAlertComponent } from './deny-alert/deny-alert.component';

@Component({
  selector: 'dp-view-petition-city-staff',
  templateUrl: './view-petition-city-staff.component.html',
  providers: [GetStaffPetitionService, DenyPetitionService],
})
export class ViewPetitionCityStaffComponent implements OnInit {
  protected success$!: Observable<ResponsePetition | undefined>;
  protected error$!: Observable<string | undefined>;
  protected loading$!: Observable<boolean>;

  protected loadingDeny$!: Observable<boolean>;

  private _unSuscribeAll: Subject<void> = new Subject();
  private _petition?: CandidatePetition | IssuePetition;

  constructor(
    private _getPetitionLogic: GetStaffPetitionService,
    private _denyPetitionLogic: DenyPetitionService,
    private _dialog: MatDialog,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.success$ = this._getPetitionLogic.success$;
    this.success$.pipe(takeUntil(this._unSuscribeAll)).subscribe((value) => {
      if (value?.dataCandidate) {
        this._petition = value.dataCandidate;
      }
      if (value?.dataIssue) {
        this._petition = value.dataIssue;
      }
    });
    this.error$ = this._getPetitionLogic.error$;
    this.loading$ = this._getPetitionLogic.loading$;

    //Deny
    this._denyPetitionLogic.success$
      .pipe(takeUntil(this._unSuscribeAll))
      .subscribe((_) => {
        this.openDialog(true);
        this._getPetitionLogic.getPetition(
          this._activatedRoute.snapshot.params['id']
        );
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
    const dialogRef = this._dialog
      .open(ApproveDialogComponent, {
        width: '690px',
        data: { ...this._petition },
      })
      .afterClosed()
      .subscribe((_) => {
        this._getPetitionLogic.getPetition(
          this._activatedRoute.snapshot.params['id']
        );
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
        this._denyPetitionLogic.denyPetition({
          expectedVersion: this._petition!.version,
          PK: this._petition!.PK,
        });
      } else {
        this._dialog.closeAll();
      }
    });
  }
}
