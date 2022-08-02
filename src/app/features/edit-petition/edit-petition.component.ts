import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  shareReplay,
  Subscription,
  tap,
} from 'rxjs';
import { EditPetitionService } from 'src/app/logic/petition/exports';
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
export class EditPetitionComponent implements OnInit, AfterViewInit {
  protected result$!: Subscription;
  protected error: string | undefined;
  protected loading$!: Observable<boolean>;
  protected currentStep$: BehaviorSubject<
    'loading' | 'candidate' | 'issue' | 'result' | 'error'
  > = new BehaviorSubject<
    'loading' | 'candidate' | 'issue' | 'result' | 'error'
  >('loading');
  protected resultData: ResponsePetition = {};

  constructor(
    private _editPetitionLogic: EditPetitionService,
    private _activatedRoute: ActivatedRoute
  ) {}
  ngAfterViewInit(): void {
    this._editPetitionLogic.petitionId =
      this._activatedRoute.snapshot.params['id'];
  }
  ngOnInit(): void {
    this.result$ = this._editPetitionLogic.result$.subscribe((result) => {
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
  cancel() {}
  submitCandidate(data: CandidatePetitionData) {
    this.resultData.dataCandidate = data;
    this.currentStep$.next('result');
  }
  submitIssue(data: IssuePetitionData) {
    this.resultData.dataIssue = data;
    this.currentStep$.next('result');
  }
}
