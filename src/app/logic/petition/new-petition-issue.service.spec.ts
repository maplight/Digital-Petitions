import { TestBed } from '@angular/core/testing';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';
import { MockedPetitionService } from 'src/testing/mocked-pettition-service';

import { NewPetitionIssueService } from './new-petition-issue.service';
import { PetitionService } from './petition.service';

describe('NewPetitionIssueService', () => {
  let service: NewPetitionIssueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NewPetitionIssueService,
        { provide: PetitionService, useClass: MockedPetitionService },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(NewPetitionIssueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
