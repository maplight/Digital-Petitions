import { TestBed } from '@angular/core/testing';

import { NewPetitionIssueService } from './new-petition-issue.service';

describe('NewPetitionIssueService', () => {
  let service: NewPetitionIssueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewPetitionIssueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
