import { TestBed } from '@angular/core/testing';

import { GetPetitionsInactiveService } from './getPetitionsInactiveService.service';

describe('CommitteeService', () => {
  let service: GetPetitionsInactiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetPetitionsInactiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
