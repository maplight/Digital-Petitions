import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';
import {
  CandidatePetition,
  IssuePetition,
  PetitionStatus,
} from 'src/app/core/api/API';
import { GetCommitteePetitionService } from 'src/app/logic/petition/get-committee-petition.service';
import { GetPublicPetitionService } from 'src/app/logic/petition/get-public-petition.service';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';
import { AlertWithdrawlPetitionComponent } from './alert-withdrawl-petition/alert-withdrawl-petition.component';
import { ConfirmWithdrawlPetitionComponent } from './confirm-withdrawl-petition/confirm-withdrawl-petition.component';

@Component({
  selector: 'dp-view-petition-committee',
  templateUrl: './view-petition-committee.component.html',
  providers: [GetCommitteePetitionService],
})
export class ViewPetitionCommitteeComponent implements OnInit {
  protected success$!: Observable<ResponsePetition | undefined>;
  protected error$!: Observable<string | undefined>;
  protected loading$!: Observable<boolean>;

  protected petition: IssuePetition | CandidatePetition | undefined;
  protected StatusStyleCurrent: string = '';
  protected StatusStyleWhite: string =
    'flex bg-[#F6D523] px-4 py-2 rounded-full items-center justify-center';
  protected StatusStyleGreen: string =
    'flex bg-[#3AC922] px-4 py-1 rounded-full items-center justify-center';
  protected StatusStyleRed: string =
    'flex bg-[#FF3030] px-4 py-1 rounded-full items-center justify-center';
  constructor(
    private _committeeLogic: GetCommitteePetitionService,

    protected _activatedRoute: ActivatedRoute,
    public _alertDialogRef: MatDialogRef<AlertWithdrawlPetitionComponent>,
    public _confirmDalogRef: MatDialogRef<ConfirmWithdrawlPetitionComponent>,
    public _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.success$ = this._committeeLogic.success$.pipe(
      tap((result) => {
        this.setState(result);
      })
    );

    this.loading$ = this._committeeLogic.loading$;
    this.error$ = this._committeeLogic.error$;
    this._committeeLogic.getPetition(
      this._activatedRoute.snapshot.params['id']
    );
  }
  private setState(data: ResponsePetition | undefined) {
    if (data) {
      this.petition = data.dataCandidate ?? data.dataIssue ?? undefined;
    }

    if (this.petition) {
      switch (this.petition.status) {
        case PetitionStatus.NEW:
          this.StatusStyleCurrent = this.StatusStyleWhite;
          break;
        case PetitionStatus.QUALIFIED:
          this.StatusStyleCurrent = this.StatusStyleGreen;
          break;
        case PetitionStatus.REJECTED:
          this.StatusStyleCurrent = this.StatusStyleRed;
          break;
        case PetitionStatus.ACTIVE:
          this.StatusStyleCurrent = '';
          break;
      }
    }
  }
  submit() {
    const dialogRef = this._dialog.open(AlertWithdrawlPetitionComponent, {
      width: '480px',
    });
    dialogRef
      .afterClosed()
      .pipe(
        tap((response) => {
          if (response) {
            this._dialog.open(ConfirmWithdrawlPetitionComponent, {
              width: '480px',
              data: {
                id: this._activatedRoute.snapshot.params['id'],
              },
            });
          }
        })
      )
      .subscribe();
  }
}
