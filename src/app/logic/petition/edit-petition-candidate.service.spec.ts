import { TestBed } from '@angular/core/testing';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';
import { MockedPetitionService } from 'src/testing/mocked-pettition-service';

import { EditPetitionCandidateService } from './edit-petition-candidate.service';
import { PetitionService } from './petition.service';

describe('EditPetitionCandidateService', () => {
  let service: EditPetitionCandidateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EditPetitionCandidateService,
        { provide: PetitionService, useClass: MockedPetitionService },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(EditPetitionCandidateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
