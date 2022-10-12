import { TestBed } from '@angular/core/testing';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';
import { MockedPetitionService } from 'src/testing/mocked-pettition-service';
import { GetStaffPetitionService } from './get-staff-petition.service';
import { PetitionService } from './petition.service';

describe('GetStaffPetitionService', () => {
  let service: GetStaffPetitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GetStaffPetitionService,
        { provide: PetitionService, useClass: MockedPetitionService },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(GetStaffPetitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
