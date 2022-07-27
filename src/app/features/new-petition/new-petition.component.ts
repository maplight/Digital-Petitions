import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IssuePetitionData } from 'src/app/shared/models/exports';

@Component({
  selector: 'dp-new-petition',
  templateUrl: './new-petition.component.html',
})
export class NewPetitionComponent implements OnInit {
  protected currentStep: '1' | '21' | '22' | '3' = '1';
  protected dataResponseIssue: IssuePetitionData = { title: '', text: '' };
  constructor() {}

  ngOnInit(): void {}

  cancel() {}

  submit1(data: string) {
    if (data === 'Issue') {
      this.currentStep = '21';
    } else if (data === 'Candidate') {
      this.currentStep = '22';
    }
  }

  submit21(data: IssuePetitionData) {
    this.dataResponseIssue = data;
    this.currentStep = '3';
  }
}
