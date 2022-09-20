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
import { GetCommitteePetitionService } from 'src/app/logic/petition/get-committee-petition.service';
import {
  CandidatePetitionData,
  IssuePetitionData,
  Result,
} from 'src/app/shared/models/exports';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';

@Component({
  selector: 'dp-edit-petition',
  templateUrl: './edit-petition.component.html',
  providers: [GetCommitteePetitionService],
})
export class EditPetitionComponent implements OnInit {
  public success$!: Observable<ResponsePetition | undefined>;
  protected loading$!: Observable<boolean>;
  protected error$!: Observable<string | undefined>;
  protected result!: boolean;

  protected dataResponse: ResponsePetition = {};

  constructor(
    private _editPetitionLogic: GetCommitteePetitionService,
    protected _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.success$ = this._editPetitionLogic.success$;
    this.loading$ = this._editPetitionLogic.loading$;
    this.error$ = this._editPetitionLogic.error$;
    this._editPetitionLogic.getPetition(
      this._activatedRoute.snapshot.params['id']
    );
    this.success$.subscribe();
  }
  cancel() {
    this._router.navigate([
      '/committee/home/' + this._activatedRoute.snapshot.params['id'],
    ]);
  }
  submitCandidate(data: CandidatePetition) {
    this.dataResponse.dataCandidate = data;
    this.result = true;
  }
  submitIssue(data: IssuePetition) {
    this.dataResponse.dataIssue = data;
    this.result = true;
  }
}
