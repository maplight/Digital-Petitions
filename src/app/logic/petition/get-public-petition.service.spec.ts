import { TestBed } from '@angular/core/testing';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';
import { MockedPetitionService } from 'src/testing/mocked-pettition-service';

import { GetPublicPetitionService } from './get-public-petition.service';
import { PetitionService } from './petition.service';

describe('GetPublicPetitionService', () => {
  let service: GetPublicPetitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GetPublicPetitionService,
        { provide: PetitionService, useClass: MockedPetitionService },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(GetPublicPetitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
