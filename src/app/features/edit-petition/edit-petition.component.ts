import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, Subject, takeUntil, tap } from 'rxjs';
import { CandidatePetition, IssuePetition } from 'src/app/core/api/API';
import { GetCommitteePetitionService } from 'src/app/logic/petition/get-committee-petition.service';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';

@Component({
  selector: 'dp-edit-petition',
  templateUrl: './edit-petition.component.html',
  providers: [GetCommitteePetitionService],
})
export class EditPetitionComponent implements OnInit, OnDestroy {
  protected success$!: Observable<ResponsePetition | undefined>;
  protected loading$!: Observable<boolean>;
  protected error$!: Observable<string | undefined>;
  protected result!: boolean;
  protected id?: string;

  protected dataResponse: ResponsePetition = {};

  private _unsubscribeAll = new Subject<void>();

  constructor(
    private _editPetitionLogic: GetCommitteePetitionService,
    protected _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.success$ = this._editPetitionLogic.success$;
    this.loading$ = this._editPetitionLogic.loading$;
    this.error$ = this._editPetitionLogic.error$;

    this._activatedRoute.paramMap
      .pipe(
        takeUntil(this._unsubscribeAll),
        map((params) => params.get('id')!),
        tap((id) => (this.id = id))
      )
      .subscribe((id) => this._editPetitionLogic.getPetition(id));
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  cancel() {
    this._router.navigate(['/committee/home/' + this.id]);
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
