import { TestBed } from '@angular/core/testing';

import { EditPetitionCandidateService } from './edit-petition-candidate.service';

describe('EditPetitionCandidateService', () => {
  let service: EditPetitionCandidateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditPetitionCandidateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
