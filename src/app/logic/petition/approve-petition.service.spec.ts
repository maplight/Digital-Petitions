import { TestBed } from '@angular/core/testing';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';
import { MockedPetitionService } from 'src/testing/mocked-pettition-service';

import { ApprovePetitionService } from './approve-petition.service';
import { PetitionService } from './petition.service';

describe('ChangePetitionStatusService', () => {
  let service: ApprovePetitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApprovePetitionService,
        { provide: PetitionService, useClass: MockedPetitionService },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(ApprovePetitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
