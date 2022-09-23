import { TestBed } from '@angular/core/testing';

import { VoterRecordMatchService } from './voter-record-match.service';

describe('SignPetitionService', () => {
  let service: VoterRecordMatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VoterRecordMatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
