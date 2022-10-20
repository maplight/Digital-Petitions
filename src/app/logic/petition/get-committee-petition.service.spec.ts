import { TestBed } from '@angular/core/testing';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';
import { MockedPetitionService } from 'src/testing/mocked-pettition-service';
import { GetCommitteePetitionService } from './get-committee-petition.service';
import { PetitionService } from './petition.service';

describe('GetCommitteePetitionService', () => {
  let service: GetCommitteePetitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GetCommitteePetitionService,
        { provide: PetitionService, useClass: MockedPetitionService },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(GetCommitteePetitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
