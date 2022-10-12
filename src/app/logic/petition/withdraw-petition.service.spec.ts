import { TestBed } from '@angular/core/testing';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';
import { MockedPetitionService } from 'src/testing/mocked-pettition-service';
import { PetitionService } from './petition.service';

import { WithdrawPetitionService } from './withdraw-petition.service';

describe('WithdrawPetitionService', () => {
  let service: WithdrawPetitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WithdrawPetitionService,
        { provide: PetitionService, useClass: MockedPetitionService },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(WithdrawPetitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
