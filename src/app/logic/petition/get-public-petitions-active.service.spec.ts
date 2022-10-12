import { TestBed } from '@angular/core/testing';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';
import { MockedPetitionService } from 'src/testing/mocked-pettition-service';
import { GetPublicPetitionsActiveService } from './get-public-petitions-active.service';
import { PetitionService } from './petition.service';

describe('CommitteeService', () => {
  let service: GetPublicPetitionsActiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GetPublicPetitionsActiveService,
        { provide: PetitionService, useClass: MockedPetitionService },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(GetPublicPetitionsActiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
