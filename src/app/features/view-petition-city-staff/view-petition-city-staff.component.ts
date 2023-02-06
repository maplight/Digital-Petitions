import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { ActivatedRoute } from '@angular/router';
import {
  combineLatest,
  map,
  tap,
  Observable,
  shareReplay,
  startWith,
  Subject,
  takeUntil,
} from 'rxjs';
import { CandidatePetition, IssuePetition } from 'src/app/core/api/API';
import { ApprovePetitionService } from 'src/app/logic/petition/approve-petition.service';
import { DenyPetitionService } from 'src/app/logic/petition/deny-petition.service';
import { GetStaffPetitionService } from 'src/app/logic/petition/get-staff-petition.service';
import { DialogResultComponent } from 'src/app/shared/dialog-result/dialog-result.component';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';
import { ApproveDialogComponent } from './approve-dialog/approve-dialog.component';
import { DenyAlertComponent } from './deny-alert/deny-alert.component';

@Component({
  selector: 'dp-view-petition-city-staff',
  templateUrl: './view-petition-city-staff.component.html',
  providers: [
    GetStaffPetitionService,
    DenyPetitionService,
    ApprovePetitionService,
  ],
})
export class ViewPetitionCityStaffComponent implements OnInit, OnDestroy {
  protected success$!: Observable<ResponsePetition | undefined>;
  protected error$!: Observable<string | undefined>;
  protected loading$!: Observable<boolean>;
  protected id?: string;
  private _unsubscribeAll: Subject<void> = new Subject();

  protected loadingDeny$!: Observable<boolean>;

  private _unSuscribeAll: Subject<void> = new Subject();
  private _afterApprove$ = new Subject<
    IssuePetition | CandidatePetition | undefined
  >();

  constructor(
    private _getPetitionLogic: GetStaffPetitionService,
    private _denyPetitionLogic: DenyPetitionService,
    private _approvePetitionLogic: ApprovePetitionService,
    private _dialog: MatDialog,
    private _activatedRoute: ActivatedRoute
  ) {}

  private readonly toPetition = (
    _?: ResponsePetition
  ): IssuePetition | CandidatePetition | undefined =>
    _?.dataCandidate ?? _?.dataIssue;

  private readonly toResponsePetition = (
    _?: IssuePetition | CandidatePetition
  ): ResponsePetition | undefined =>
    _?.type === 'CANDIDATE'
      ? { dataCandidate: _ as CandidatePetition }
      : _?.type === 'ISSUE'
      ? { dataIssue: _ as IssuePetition }
      : undefined;
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
  ngOnInit(): void {
    this.error$ = this._getPetitionLogic.error$;

    this.loading$ = combineLatest([
      this._getPetitionLogic.loading$,
      this._approvePetitionLogic.loading$.pipe(startWith(false)),
      this._denyPetitionLogic.loading$.pipe(startWith(false)),
    ]).pipe(map((loading) => loading.some((_) => _)));

    const petition$ = this._getPetitionLogic.success$.pipe(
      map(this.toPetition)
    );

    const afterDeny$ = this._denyPetitionLogic.success$.pipe(
      map(this.toPetition),
      startWith(undefined)
    );

    this.success$ = combineLatest([
      petition$,
      this._afterApprove$.pipe(startWith(undefined)),
      afterDeny$,
    ]).pipe(
      map(([base, approve, reject]) => {
        if (!base) return undefined;

        let _ = base;

        if (approve) {
          _ = { ..._, ...approve };
        }

        if (reject) {
          _ = { ..._, ...reject };
        }

        return _;
      }),
      map(this.toResponsePetition),
      shareReplay(1)
    );

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

    this._activatedRoute.paramMap
      .pipe(
        takeUntil(this._unsubscribeAll),
        map((params) => params.get('id')!),
        tap((id) => (this.id = id))
      )
      .subscribe((id) => this._getPetitionLogic.getPetition(id));
  }

  approveDialog(data: ResponsePetition): void {
    const dialogRef = this._dialog.open(ApproveDialogComponent, {
      width: '690px',
      data: { ...this.toPetition(data) },
    });

    dialogRef.afterClosed().subscribe(() => {
      this._afterApprove$.next(dialogRef.componentInstance.data);
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

  denyAlert(petition: ResponsePetition): void {
    const dialogRef = this._dialog.open(DenyAlertComponent, {
      width: '480px',
    });

    const _ = this.toPetition(petition);

    if (!_) return;

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._denyPetitionLogic.denyPetition({
          expectedVersion: _.version,
          PK: _.PK,
        });
      } else {
        this._dialog.closeAll();
      }
    });
  }
}
