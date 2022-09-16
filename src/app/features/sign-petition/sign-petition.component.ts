import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { GetPublicPetitionService } from 'src/app/logic/petition/get-public-petition.service';
import { SignPetitionService } from 'src/app/logic/petition/sign-petition.service';
import { FilterData } from 'src/app/shared/models/exports';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';
import { SignaturePetitionData } from 'src/app/shared/models/petition/signature-petition-data';
import { SignaturePetitionType } from 'src/app/shared/models/petition/signature-petition-type';

@Component({
  selector: 'dp-sign-petition',
  templateUrl: './sign-petition.component.html',
})
export class SignPetitionComponent implements OnInit {
  protected resultData: ResponsePetition = {};
  protected result$!: Subscription;
  protected resultPetition$!: Subscription;
  protected error: string | undefined;
  protected loading$!: Observable<boolean>;
  protected currentStep$: BehaviorSubject<
    'loading' | 'verify' | 'empty' | 'view' | 'sign' | 'error'
  > = new BehaviorSubject<
    'loading' | 'verify' | 'empty' | 'view' | 'sign' | 'error'
  >('loading');
  protected signatureData!: SignaturePetitionData;

  constructor(
    private _committeeLogic: GetPublicPetitionService,

    private _activatedRoute: ActivatedRoute
  ) {}
  ngAfterViewInit(): void {
    this._committeeLogic.getPetition(
      this._activatedRoute.snapshot.params['id']
    );
  }
  ngOnInit(): void {
    this.result$ = this._committeeLogic.result$.subscribe((result) => {
      if (!!result.result) {
        this.resultData = result.result;

        this.currentStep$.next('view');
      } else {
        this.error = result.error;
        this.currentStep$.next('error');
      }
    });
  }

  protected submitPersonalData(data: SignaturePetitionData) {
    this.signatureData = data;
    this.currentStep$.next('verify');
  }

  protected cancel(
    value: 'loading' | 'verify' | 'empty' | 'view' | 'sign' | 'error'
  ) {
    if (value === 'sign') {
      this.signatureData.verify = { verifyType: '' };
    }

    this.currentStep$.next(value);
  }
}
