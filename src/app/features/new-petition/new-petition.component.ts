import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { StepIndicatorService } from 'src/app/logic/petition/step-indicator.service';
import {
  CandidatePetitionData,
  IssuePetitionData,
} from 'src/app/shared/models/exports';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';

@Component({
  selector: 'dp-new-petition',
  templateUrl: './new-petition.component.html',
})
export class NewPetitionComponent implements OnInit, AfterViewInit {
  protected dataResponse: ResponsePetition = {};
  protected dataResponseIssue: IssuePetitionData = { title: '', text: '' };
  protected dataResponseCandidate: CandidatePetitionData = {
    fullName: '',
    office: '',
    party: '',
    address: '',
    aptNumber: '',
    city: '',
    state: { name: '', value: '' },
    zipCode: '',
  };
  protected currentStep$: Observable<'1' | '21' | '22' | '3'>;
  constructor(
    private _stepLogic: StepIndicatorService,
    private _router: Router
  ) {
    this.currentStep$ = this._stepLogic._publicCurrentStep$;
  }
  ngAfterViewInit(): void {
    this._stepLogic.currentStep = '1';
  }

  ngOnInit(): void {}

  cancel(step?: '1' | '21' | '22' | '3') {
    step ? (this._stepLogic.currentStep = step) : this._router.navigate([]);
  }

  submit1(data: string) {
    if (data === 'Issue') {
      this._stepLogic.currentStep = '21';
    } else if (data === 'Candidate') {
      this._stepLogic.currentStep = '22';
    }
  }

  submit21(data: IssuePetitionData) {
    this.dataResponse.dataIssue = data;
    this._stepLogic.currentStep = '3';
  }

  submit22(data: CandidatePetitionData) {
    this.dataResponse.dataCandidate = data;
    this._stepLogic.currentStep = '3';
  }
}
