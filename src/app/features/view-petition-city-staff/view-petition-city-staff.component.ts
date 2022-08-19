import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';
import {
  CandidatePetition,
  IssuePetition,
  PetitionStatus,
} from 'src/app/core/api/API';
import { GetPetitionService } from 'src/app/logic/petition/get-petition.service';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';
import { AlertWithdrawlPetitionComponent } from '../view-petition-committee/alert-withdrawl-petition/alert-withdrawl-petition.component';
import { ConfirmWithdrawlPetitionComponent } from '../view-petition-committee/confirm-withdrawl-petition/confirm-withdrawl-petition.component';
import { ApproveDialogComponent } from './approve-dialog/approve-dialog.component';

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

  protected currentStep$: BehaviorSubject<
    'loading' | 'empty' | 'contents' | 'error'
  > = new BehaviorSubject<'loading' | 'empty' | 'contents' | 'error'>(
    'loading'
  );
  protected petition: IssuePetition | CandidatePetition | undefined;
  constructor(
    private _committeeLogic: GetPetitionService,
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
  }
  private setState(data: ResponsePetition) {
    this.petition = this.resultData.dataCandidate
      ? this.resultData.dataCandidate
      : this.resultData.dataIssue
      ? this.resultData.dataIssue
      : undefined;
  }

  aproveDialog(): void {
    const dialogRef = this._dialog.open(ApproveDialogComponent, {
      width: '690px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed ' + result);
    });
  }
}
