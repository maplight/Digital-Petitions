import { TestBed } from '@angular/core/testing';

import { GetPublicPetitionService } from './get-public-petition.service';

describe('EditPetitionService', () => {
  let service: GetPublicPetitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetPublicPetitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
