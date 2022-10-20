import { TestBed } from '@angular/core/testing';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';
import { MockedPetitionService } from 'src/testing/mocked-pettition-service';

import { NewPetitionCandidateService } from './new-petition-candidate.service';
import { PetitionService } from './petition.service';

describe('NewPetitionCandidateService', () => {
  let service: NewPetitionCandidateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NewPetitionCandidateService,
        { provide: PetitionService, useClass: MockedPetitionService },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(NewPetitionCandidateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
