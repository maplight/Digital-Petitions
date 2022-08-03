import { TestBed } from '@angular/core/testing';

import { GetPetitionsService } from './getPetitionsService.service';

describe('CommitteeService', () => {
  let service: GetPetitionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetPetitionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
