import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StepIndicatorService } from 'src/app/logic/petition/step-indicator.service';
import { IssuePetitionData } from 'src/app/shared/models/exports';

@Component({
  selector: 'dp-new-petition',
  templateUrl: './new-petition.component.html',
})
export class NewPetitionComponent implements OnInit, AfterViewInit {
  protected dataResponseIssue: IssuePetitionData = { title: '', text: '' };
  protected currentStep$: Observable<'1' | '21' | '22' | '3'>;
  constructor(private _stepLogic: StepIndicatorService) {
    this.currentStep$ = this._stepLogic._publicCurrentStep$;
  }
  ngAfterViewInit(): void {
    this._stepLogic.currentStep = '1';
  }

  ngOnInit(): void {}

  cancel() {}

  submit1(data: string) {
    if (data === 'Issue') {
      this._stepLogic.currentStep = '21';
    } else if (data === 'Candidate') {
      this._stepLogic.currentStep = '22';
    }
  }

  submit21(data: IssuePetitionData) {
    this.dataResponseIssue = data;
    this._stepLogic.currentStep = '3';
  }
}
