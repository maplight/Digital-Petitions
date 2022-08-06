import { TestBed } from '@angular/core/testing';

import { WithdrawPetitionService } from './withdraw-petition.service';

describe('WithdrawPetitionService', () => {
  let service: WithdrawPetitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WithdrawPetitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
