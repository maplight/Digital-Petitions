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

  protected currentStep: 'type' | 'issue' | 'candidate' | 'result' = 'type';

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
  protected currentStep$: Observable<'type' | 'issue' | 'candidate' | 'result'>;
  constructor(
    private _stepLogic: StepIndicatorService,
    private _router: Router
  ) {
    this.currentStep$ = this._stepLogic._publicCurrentStep$;
  }
  ngAfterViewInit(): void {
    this._stepLogic.currentStep = 'type';
  }

  ngOnInit(): void {}

  cancel(step?: 'type' | 'issue' | 'candidate' | 'result') {
    step
      ? (this._stepLogic.currentStep = step)
      : this._router.navigate(['asd']);
  }

  submitType(data: string) {
    if (data === 'Issue') {

      this._stepLogic.currentStep = 'issue';
    } else if (data === 'Candidate') {
      this._stepLogic.currentStep = 'candidate';
    }
  }

  submitIssue(data: IssuePetitionData) {
    this.dataResponse.dataIssue = data;
    this._stepLogic.currentStep = 'result';
  }

  submitCandidate(data: CandidatePetitionData) {
    this.dataResponse.dataCandidate = data;
    this._stepLogic.currentStep = 'result';

  }
}
