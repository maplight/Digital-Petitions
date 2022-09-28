import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  BehaviorSubject,
  map,
  Observable,
  Subject,
  takeUntil,
  tap,
} from 'rxjs';
import { VoterRecordMatch } from 'src/app/core/api/API';
import { GetPublicPetitionService } from 'src/app/logic/petition/get-public-petition.service';

import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';

@Component({
  selector: 'dp-sign-petition',
  templateUrl: './sign-petition.component.html',
  providers: [GetPublicPetitionService],
})
export class SignPetitionComponent implements OnInit, OnDestroy {
  protected success$!: Observable<ResponsePetition | undefined>;
  protected error$!: Observable<string | undefined>;
  protected loading$!: Observable<boolean>;
  private _unsubscribeAll: Subject<void> = new Subject();
  protected id?: string;
  protected currentStep$: BehaviorSubject<'verify' | 'view' | 'sign'> =
    new BehaviorSubject<'verify' | 'view' | 'sign'>('view');
  protected signatureData!: VoterRecordMatch;

  constructor(
    private _getPetitionLogic: GetPublicPetitionService,

    private _activatedRoute: ActivatedRoute
  ) {}
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  ngOnInit(): void {
    this.success$ = this._getPetitionLogic.success$;
    this.loading$ = this._getPetitionLogic.loading$;
    this.error$ = this._getPetitionLogic.error$;
    this._activatedRoute.paramMap
      .pipe(
        takeUntil(this._unsubscribeAll),
        map((params) => params.get('id')!),
        tap((id) => (this.id = id))
      )
      .subscribe((id) => this._getPetitionLogic.getPetition(id));
  }

  protected submitPersonalData(data: VoterRecordMatch) {
    this.signatureData = data;
    this.currentStep$.next('verify');
  }

  protected cancel(value: 'verify' | 'view' | 'sign') {
    if (value === 'sign') {
      this.signatureData.methods = [];
    }

    this.currentStep$.next(value);
  }
}
