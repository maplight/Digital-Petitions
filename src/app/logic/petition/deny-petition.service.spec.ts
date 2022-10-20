import { TestBed } from '@angular/core/testing';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';
import { MockedPetitionService } from 'src/testing/mocked-pettition-service';

import { ApprovePetitionService } from './approve-petition.service';
import { DenyPetitionService } from './deny-petition.service';
import { PetitionService } from './petition.service';

describe('DenyPetitionService', () => {
  let service: DenyPetitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DenyPetitionService,
        { provide: PetitionService, useClass: MockedPetitionService },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(DenyPetitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
