import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import {
  CandidatePetition,
  CandidatePetitionInput,
  IssuePetition,
  IssuePetitionInput,
} from 'src/app/core/api/API';

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
export class NewPetitionComponent implements OnInit {
  protected dataResponse: ResponsePetition = {};

  protected dataResponseIssue!: IssuePetitionInput;
  protected dataResponseCandidate!: CandidatePetitionInput;
  protected currentStep$!: Observable<
    'type' | 'issue' | 'candidate' | 'result'
  >;
  constructor(
    private _stepLogic: StepIndicatorService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.currentStep$ = this._stepLogic._publicCurrentStep$;
    this._stepLogic.setCurrentStep('type');
  }

  cancel(step?: 'type' | 'issue' | 'candidate' | 'result') {
    if (step) {
      this._stepLogic.setCurrentStep(step);
    } else {
      this._stepLogic.setCurrentStep('type');
      this._router.navigate(['/committee/home']);
    }
  }

  submitType(data: string) {
    if (data === 'Issue') {
      this._stepLogic.setCurrentStep('issue');
    } else if (data === 'Candidate') {
      this._stepLogic.setCurrentStep('candidate');
    }
  }

  submitIssue(data: IssuePetition) {
    this.dataResponse.dataIssue = data;

    this._stepLogic.setCurrentStep('result');
  }

  submitCandidate(data: CandidatePetition) {
    this.dataResponse.dataCandidate = data;

    this._stepLogic.setCurrentStep('result');
  }
}
