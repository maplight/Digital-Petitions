import { TestBed } from '@angular/core/testing';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';
import { MockedPetitionService } from 'src/testing/mocked-pettition-service';

import { GetInactivePetitionsService } from './get-inactive-petitions.service';
import { PetitionService } from './petition.service';

describe('GetInactivePetitionsService', () => {
  let service: GetInactivePetitionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GetInactivePetitionsService,
        { provide: PetitionService, useClass: MockedPetitionService },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(GetInactivePetitionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
