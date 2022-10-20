import { TestBed } from '@angular/core/testing';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';
import { MockedPetitionService } from 'src/testing/mocked-pettition-service';
import { PetitionService } from './petition.service';

import { SignPetitionService } from './sign-petition.service';

describe('SignPetitionService', () => {
  let service: SignPetitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SignPetitionService,
        { provide: PetitionService, useClass: MockedPetitionService },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(SignPetitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
