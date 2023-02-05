import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import {
  MatLegacyDialog as MatDialog,
  MatLegacyDialogRef as MatDialogRef,
} from '@angular/material/legacy-dialog';
import { ActivatedRoute } from '@angular/router';
import { Subject, Observable, takeUntil, tap, map } from 'rxjs';
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
export class ViewPetitionCommitteeComponent implements OnInit, OnDestroy {
  protected success$!: Observable<ResponsePetition | undefined>;
  protected error$!: Observable<string | undefined>;
  protected loading$!: Observable<boolean>;
  protected id?: string;
  private _unsubscribeAll: Subject<void> = new Subject();

  protected petition: IssuePetition | CandidatePetition | undefined;
  protected StatusStyleCurrent: string = '';
  protected StatusStyleWhite: string =
    'flex bg-[#F6D523] px-4 py-2 rounded-full items-center justify-center';
  protected StatusStyleGreen: string =
    'flex bg-[#3AC922] px-4 py-1 rounded-full items-center justify-center';
  protected StatusStyleRed: string =
    'flex bg-[#FF3030] px-4 py-1 rounded-full items-center justify-center';
  constructor(
    private _getPetitionLogic: GetCommitteePetitionService,

    protected _activatedRoute: ActivatedRoute,
    public _alertDialogRef: MatDialogRef<AlertWithdrawlPetitionComponent>,
    public _confirmDalogRef: MatDialogRef<ConfirmWithdrawlPetitionComponent>,
    public _dialog: MatDialog
  ) {}
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  ngOnInit(): void {
    this.success$ = this._getPetitionLogic.success$.pipe(
      tap((result) => {
        this.setState(result);
      })
    );
    this._activatedRoute.paramMap
      .pipe(
        takeUntil(this._unsubscribeAll),
        map((params) => params.get('id')!),
        tap((id) => (this.id = id))
      )
      .subscribe((id) => this._getPetitionLogic.getPetition(id));
    this.loading$ = this._getPetitionLogic.loading$;
    this.error$ = this._getPetitionLogic.error$;
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
                id: this.id,
                title: 'name',
              },
            });
          }
        })
      )
      .subscribe();
  }
}
