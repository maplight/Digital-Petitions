import { TestBed } from '@angular/core/testing';

import { EditPetitionIssueService } from './edit-petition-issue.service';

describe('EditPetitionIssueService', () => {
  let service: EditPetitionIssueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditPetitionIssueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
