import { TestBed } from '@angular/core/testing';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';
import { MockedPetitionService } from 'src/testing/mocked-pettition-service';

import { GetCommitteePetitionsService } from './get-committee-petitions.service';
import { PetitionService } from './petition.service';

describe('CommitteeService', () => {
  let service: GetCommitteePetitionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GetCommitteePetitionsService,
        { provide: PetitionService, useClass: MockedPetitionService },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(GetCommitteePetitionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
