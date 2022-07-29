import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, shareReplay, tap } from 'rxjs';
import { EditPetitionService } from 'src/app/logic/petition/exports';
import {
  CandidatePetitionData,
  IssuePetitionData,
} from 'src/app/shared/models/exports';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';

@Component({
  selector: 'dp-edit-petition',
  templateUrl: './edit-petition.component.html',
})
export class EditPetitionComponent implements OnInit, AfterViewInit {
  protected result$;
  protected error$;
  protected loading$;
  protected currentStep$: BehaviorSubject<
    'loading' | 'candidate' | 'issue' | 'result'
  > = new BehaviorSubject<'loading' | 'candidate' | 'issue' | 'result'>(
    'loading'
  );
  protected resultData: ResponsePetition = {};
  protected resultDataCandidate!: CandidatePetitionData;
  protected resultDataIssue!: IssuePetitionData;
  constructor(
    private _editPetitionLogic: EditPetitionService,
    private _activatedRoute: ActivatedRoute
  ) {
    this.result$ = this._editPetitionLogic.result$
      .pipe(
        tap((result) => {
          if (!!result.result) {
            if (!!result.result.dataCandidate) {
              this.resultDataCandidate = result.result.dataCandidate;
              this.currentStep$.next('candidate');
            } else if (!!result.result.dataIssue) {
              this.resultDataIssue = result.result.dataIssue;
              this.currentStep$.next('issue');
            }
          }
        })
      )
      .subscribe();
    this.loading$ = this._editPetitionLogic.loading$;
    this.error$ = this._editPetitionLogic.error$;
  }
  ngAfterViewInit(): void {
    this._editPetitionLogic.petitionId =
      this._activatedRoute.snapshot.params['id'];
  }
  ngOnInit(): void {}
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
