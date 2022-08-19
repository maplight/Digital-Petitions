import { TestBed } from '@angular/core/testing';

import { ChangePetitionStatusService } from './change-petition-status.service';

describe('ChangePetitionStatusService', () => {
  let service: ChangePetitionStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangePetitionStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
