import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';
import { GetPetitionService } from 'src/app/logic/petition/get-petition.service';
import { WithdrawPetitionService } from 'src/app/logic/petition/withdraw-petition.service';
import { FilterData } from 'src/app/shared/models/exports';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';
import { AlertWithdrawlPetitionComponent } from './alert-withdrawl-petition/alert-withdrawl-petition.component';
import { ConfirmWithdrawlPetitionComponent } from './confirm-withdrawl-petition/confirm-withdrawl-petition.component';

@Component({
  selector: 'dp-view-petition-committee',
  templateUrl: './view-petition-committee.component.html',
})
export class ViewPetitionCommitteeComponent implements OnInit, AfterViewInit {
  protected resultData: ResponsePetition = {};
  protected result$!: Subscription;
  protected error: string | undefined;
  protected loading$!: Observable<boolean>;
  protected currentStep$: BehaviorSubject<
    'loading' | 'empty' | 'contents' | 'error'
  > = new BehaviorSubject<'loading' | 'empty' | 'contents' | 'error'>(
    'loading'
  );
  protected status: string | undefined;
  protected StatusStyleCurrent: string = '';
  protected StatusStyleWhite: string =
    'flex bg-[#F6D523] px-4 py-2 rounded-full items-center';
  protected StatusStyleGreen: string =
    'flex bg-[#3AC922] px-4 py-1 rounded-full items-center';
  protected StatusStyleRed: string =
    'flex bg-[#FF3030] px-4 py-1 rounded-full items-center';
  constructor(
    private _committeeLogic: GetPetitionService,

    private _activatedRoute: ActivatedRoute,
    public _alertDialogRef: MatDialogRef<AlertWithdrawlPetitionComponent>,
    public _confirmDalogRef: MatDialogRef<ConfirmWithdrawlPetitionComponent>,
    public _dialog: MatDialog
  ) {}
  ngAfterViewInit(): void {
    this._committeeLogic.petitionId =
      this._activatedRoute.snapshot.params['id'];
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
    if (!!data.dataCandidate) {
      this.status = data.dataCandidate.atributes?.status;
    } else if (!!data.dataIssue) {
      this.status = data.dataIssue.atributes?.status;
    }
    if (this.status) {
      switch (this.status) {
        case 'new':
          this.status = 'Awaiting Approval';
          this.StatusStyleCurrent = this.StatusStyleWhite;
          break;
        case 'passed':
          this.status = 'Passed';
          this.StatusStyleCurrent = this.StatusStyleGreen;
          break;
        case 'failed':
          this.status = 'Failed';
          this.StatusStyleCurrent = this.StatusStyleRed;
          break;
        case 'open':
          this.status = '';
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
