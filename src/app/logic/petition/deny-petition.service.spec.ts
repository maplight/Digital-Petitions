import { TestBed } from '@angular/core/testing';

import { ApprovePetitionService } from './approve-petition.service';

describe('ChangePetitionStatusService', () => {
  let service: ApprovePetitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApprovePetitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
