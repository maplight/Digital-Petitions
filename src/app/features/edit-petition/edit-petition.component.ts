import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  shareReplay,
  Subject,
  Subscription,
  takeUntil,
  tap,
} from 'rxjs';
import { CandidatePetition, IssuePetition } from 'src/app/core/api/API';
import { GetPublicPetitionService } from 'src/app/logic/petition/exports';
import {
  CandidatePetitionData,
  IssuePetitionData,
  Result,
} from 'src/app/shared/models/exports';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';

@Component({
  selector: 'dp-edit-petition',
  templateUrl: './edit-petition.component.html',
})
export class EditPetitionComponent implements OnInit, AfterViewInit, OnDestroy {
  protected result$!: Subscription;
  protected error: string | undefined;
  protected loading$!: Observable<boolean>;
  private _unsubscribeAll: Subject<void> = new Subject();
  protected currentStep$: BehaviorSubject<
    'loading' | 'candidate' | 'issue' | 'result' | 'error'
  > = new BehaviorSubject<
    'loading' | 'candidate' | 'issue' | 'result' | 'error'
  >('loading');
  protected resultData: ResponsePetition = {};

  constructor(
    private _editPetitionLogic: GetPublicPetitionService,
    protected _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {}
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
  ngAfterViewInit(): void {
    this._editPetitionLogic.getPetition(
      this._activatedRoute.snapshot.params['id']
    );
  }
  ngOnInit(): void {
    this.result$ = this._editPetitionLogic.result$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((result) => {
        if (!!result.result) {
          this.resultData = result.result;
          if (!!result.result.dataCandidate) {
            this.currentStep$.next('candidate');
          } else if (!!result.result.dataIssue) {
            this.currentStep$.next('issue');
          }
        } else {
          this.error = result.error;
          this.currentStep$.next('error');
        }
      });
    this.loading$ = this._editPetitionLogic.loading$;
  }
  cancel() {
    this._router.navigate([
      '/committee/home/' + this._activatedRoute.snapshot.params['id'],
    ]);
  }
  submitCandidate(data: CandidatePetition) {
    this.resultData.dataCandidate = data;
    this.currentStep$.next('result');
  }
  submitIssue(data: IssuePetition) {
    this.resultData.dataIssue = data;
    this.currentStep$.next('result');
  }
}
