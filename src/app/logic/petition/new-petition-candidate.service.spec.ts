import { TestBed } from '@angular/core/testing';

import { NewPetitionCandidateService } from './new-petition-candidate.service';

describe('NewPetitionCandidateService', () => {
  let service: NewPetitionCandidateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewPetitionCandidateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
