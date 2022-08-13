import { TestBed } from '@angular/core/testing';

import { SignPetitionService } from './sign-petition.service';

describe('SignPetitionService', () => {
  let service: SignPetitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignPetitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
