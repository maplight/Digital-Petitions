import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'dp-edit-petition',
  templateUrl: './edit-petition.component.html',
})
export class EditPetitionComponent implements OnInit {
  protected currentStep$: BehaviorSubject<
    'loading' | 'candidate' | 'issue' | 'result'
  > = new BehaviorSubject<'loading' | 'candidate' | 'issue' | 'result'>(
    'issue'
  );
  constructor() {}
  ngOnInit(): void {}
  cancel() {}
  submitCandidate(data: any) {}
  submitIssue(data: any) {}
}
