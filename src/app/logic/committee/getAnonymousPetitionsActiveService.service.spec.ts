import { TestBed } from '@angular/core/testing';

import { GetPetitionsActiveService } from './getPetitionsActiveService.service';

describe('CommitteeService', () => {
  let service: GetPetitionsActiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetPetitionsActiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
