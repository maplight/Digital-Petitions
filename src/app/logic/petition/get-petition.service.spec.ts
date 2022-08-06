import { TestBed } from '@angular/core/testing';

import { GetPetitionService } from './get-petition.service';

describe('EditPetitionService', () => {
  let service: GetPetitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetPetitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
