import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { GetPetitionService } from 'src/app/logic/petition/get-petition.service';
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
  protected error: string | undefined;
  protected loading$!: Observable<boolean>;
  protected currentStep$: BehaviorSubject<
    'loading' | 'verify' | 'empty' | 'view' | 'sign' | 'error'
  > = new BehaviorSubject<
    'loading' | 'verify' | 'empty' | 'view' | 'sign' | 'error'
  >('loading');
  protected signatureData!: SignaturePetitionData;
  private currentFilter: FilterData[] = [
    {
      property: '',
      value: '',
      page: 0,
    },
  ];

  constructor(
    private _committeeLogic: GetPetitionService,
    private _activatedRoute: ActivatedRoute
  ) {}
  ngAfterViewInit(): void {
    this._committeeLogic.petitionId =
      this._activatedRoute.snapshot.params['id'];
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
    this.loading$ = this._committeeLogic.loading$;
  }

  protected submitPersonalData(data: SignaturePetitionData) {
    this.signatureData = data;
    this.currentStep$.next('verify');
  }

  protected submitVerifyData(data: SignaturePetitionType) {
    this.signatureData.verify = data;
    console.log(this.signatureData);
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
