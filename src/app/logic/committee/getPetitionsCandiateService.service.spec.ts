import { TestBed } from '@angular/core/testing';

import { GetPetitionsCandidateService } from './getPetitionsCandidateService.service';

describe('CommitteeService', () => {
  let service: GetPetitionsCandidateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetPetitionsCandidateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
