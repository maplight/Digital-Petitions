import { TestBed } from '@angular/core/testing';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';
import { MockedPetitionService } from 'src/testing/mocked-pettition-service';

import { EditPetitionIssueService } from './edit-petition-issue.service';
import { PetitionService } from './petition.service';

describe('EditPetitionIssueService', () => {
  let service: EditPetitionIssueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EditPetitionIssueService,
        { provide: PetitionService, useClass: MockedPetitionService },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(EditPetitionIssueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
