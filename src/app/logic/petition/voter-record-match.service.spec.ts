import { TestBed } from '@angular/core/testing';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';
import { MockedPetitionService } from 'src/testing/mocked-pettition-service';
import { PetitionService } from './petition.service';

import { VoterRecordMatchService } from './voter-record-match.service';

describe('VoterRecordMatchService', () => {
  let service: VoterRecordMatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        VoterRecordMatchService,
        { provide: PetitionService, useClass: MockedPetitionService },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(VoterRecordMatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
