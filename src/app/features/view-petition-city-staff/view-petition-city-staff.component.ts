import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';
import {
  CandidatePetition,
  IssuePetition,
  PetitionStatus,
} from 'src/app/core/api/API';
import { ApprovePetitionService } from 'src/app/logic/petition/approve-petition.service';
import { DenyPetitionService } from 'src/app/logic/petition/deny-petition.service';
import { GetPetitionService } from 'src/app/logic/petition/get-petition.service';
import { DialogResultComponent } from 'src/app/shared/dialog-result/dialog-result.component';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';
import { ApproveDialogComponent } from './approve-dialog/approve-dialog.component';
import { DenyAlertComponent } from './deny-alert/deny-alert.component';

@Component({
  selector: 'dp-view-petition-city-staff',
  templateUrl: './view-petition-city-staff.component.html',
})
export class ViewPetitionCityStaffComponent implements OnInit {
  protected id: string = '0';
  protected resultData: ResponsePetition = {};

  protected result$!: Subscription;
  protected error: string | undefined;
  protected loading$!: Observable<boolean>;

  protected resultDeny$!: Subscription;
  protected errorDeny: string | undefined;
  protected loadingDeny$!: Observable<boolean>;

  protected currentStep$: BehaviorSubject<
    'loading' | 'empty' | 'contents' | 'error'
  > = new BehaviorSubject<'loading' | 'empty' | 'contents' | 'error'>(
    'loading'
  );
  protected petition: IssuePetition | CandidatePetition | undefined;
  constructor(
    private _committeeLogic: GetPetitionService,
    private _denyPetitionLogic: DenyPetitionService,
    private _dialog: MatDialog,
    private _activatedRoute: ActivatedRoute
  ) {}
  ngAfterViewInit(): void {
    this.id = this._activatedRoute.snapshot.params['id'];
    this._committeeLogic.getPetition(
      this._activatedRoute.snapshot.params['id']
    );
  }
  ngOnInit(): void {
    this.result$ = this._committeeLogic.result$.subscribe((result) => {
      if (!!result.result) {
        this.resultData = result.result;
        this.setState(result.result);
        this.currentStep$.next('contents');
      } else {
        this.error = result.error;
        this.currentStep$.next('error');
      }
    });
    this.loading$ = this._committeeLogic.loading$;
    //Deny
    this.resultDeny$ = this._denyPetitionLogic.result$.subscribe((result) => {
      if (!!result.result) {
        this._dialog.open(DialogResultComponent, {
          width: '520px',
          data: {
            title: 'Petition Denied!',
            message: '',
            success: true,
          },
        });
      } else {
        this.errorDeny = result.error;
      }
    });
    this.loadingDeny$ = this._denyPetitionLogic.loading$;
  }
  private setState(data: ResponsePetition) {
    this.petition = this.resultData.dataCandidate
      ? this.resultData.dataCandidate
      : this.resultData.dataIssue
      ? this.resultData.dataIssue
      : undefined;
  }

  approveDialog(): void {
    const dialogRef = this._dialog.open(ApproveDialogComponent, {
      width: '690px',
      data: {
        id: this.id,
      },
    });
  }

  denyAlert() {
    const dialogRef = this._dialog.open(DenyAlertComponent, {
      width: '480px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._denyPetitionLogic.denyPetition(this.id);
      } else {
        this._dialog.closeAll();
      }
    });
  }
}
