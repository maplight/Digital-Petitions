import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  shareReplay,
  Subscription,
  tap,
} from 'rxjs';
import { CandidatePetition, IssuePetition } from 'src/app/core/api/API';
import { GetPetitionService } from 'src/app/logic/petition/exports';
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
  protected id: string = '0';
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
    private _editPetitionLogic: GetPetitionService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {}
  ngAfterViewInit(): void {
    this.id = this._activatedRoute.snapshot.params['id'];
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
  cancel() {
    this._router.navigate(['/committee/home/' + this.id]);
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
