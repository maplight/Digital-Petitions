import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IssuePetitionData } from 'src/app/shared/models/exports';

@Component({
  selector: 'dp-new-petition',
  templateUrl: './new-petition.component.html',
})
export class NewPetitionComponent implements OnInit {
  protected currentStep: 'type' | 'issue' | 'candidate' | 'result' = 'type';
  protected dataResponseIssue: IssuePetitionData = { title: '', text: '' };
  constructor() {}

  ngOnInit(): void {}

  cancel() {}

  submitType(data: string) {
    if (data === 'Issue') {
      this.currentStep = 'issue';
    } else if (data === 'Candidate') {
      this.currentStep = 'candidate';
    }
  }

  submitIssue(data: IssuePetitionData) {
    this.dataResponseIssue = data;
    this.currentStep = 'result';
  }
}
