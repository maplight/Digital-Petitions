import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { CandidatePetition, IssuePetition } from 'src/app/core/api/API';
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

  protected currentStep: 'type' | 'issue' | 'candidate' | 'result' = 'type';

  protected dataResponseIssue: IssuePetitionData = {
    id: 0,
    title: '',
    detail: '',
  };
  protected dataResponseCandidate: CandidatePetitionData = {
    id: 0,
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
    this._stepLogic.currentStep = 'type';
  }

  ngOnInit(): void {}

  cancel(step?: 'type' | 'issue' | 'candidate' | 'result') {
    step
      ? (this._stepLogic.currentStep = step)
      : this._router.navigate(['/committee/home']);
  }

  submitType(data: string) {
    if (data === 'Issue') {
      this._stepLogic.currentStep = 'issue';
    } else if (data === 'Candidate') {
      this._stepLogic.currentStep = 'candidate';
    }
  }

  submitIssue(data: IssuePetition) {
    this.dataResponse.dataIssue = data;
    console.log(this.dataResponse);
    this._stepLogic.currentStep = 'result';
  }

  submitCandidate(data: CandidatePetition) {
    this.dataResponse.dataCandidate = data;
    console.log(this.dataResponse);
    this._stepLogic.currentStep = 'result';
  }
}
