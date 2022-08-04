import { TestBed } from '@angular/core/testing';

import { GetPetitionsCommitteeService } from './getPetitionsCommitteeService.service';

describe('CommitteeService', () => {
  let service: GetPetitionsCommitteeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetPetitionsCommitteeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
