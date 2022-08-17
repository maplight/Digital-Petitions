import { TestBed } from '@angular/core/testing';

import { ConfirmSignPetitionService } from './confirm-sign-petition.service';

describe('ConfirmSignPetitionService', () => {
  let service: ConfirmSignPetitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmSignPetitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
