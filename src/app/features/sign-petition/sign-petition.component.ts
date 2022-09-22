import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subject, merge } from 'rxjs';
import { VoterRecordMatch } from 'src/app/core/api/API';
import { GetPublicPetitionService } from 'src/app/logic/petition/get-public-petition.service';

import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';

@Component({
  selector: 'dp-sign-petition',
  templateUrl: './sign-petition.component.html',
})
export class SignPetitionComponent implements OnInit {
  protected success$!: Observable<ResponsePetition | undefined>;
  protected error$!: Observable<string | undefined>;
  protected loading$!: Observable<boolean>;

  protected currentStep$: BehaviorSubject<'verify' | 'view' | 'sign'> =
    new BehaviorSubject<'verify' | 'view' | 'sign'>('view');
  protected signatureData!: VoterRecordMatch;

  constructor(
    private _committeeLogic: GetPublicPetitionService,

    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.success$ = this._committeeLogic.success$;
    this.loading$ = this._committeeLogic.loading$;
    this.error$ = this._committeeLogic.error$;
    this._committeeLogic.getPetition(
      this._activatedRoute.snapshot.params['id']
    );
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
