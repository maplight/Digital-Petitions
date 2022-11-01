import { TestBed } from '@angular/core/testing';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';
import { MockedPetitionService } from 'src/testing/mocked-pettition-service';
import { PetitionService } from './petition.service';

import { StepIndicatorService } from './step-indicator.service';

describe('StepIndicatorService', () => {
  let service: StepIndicatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StepIndicatorService,
        { provide: PetitionService, useClass: MockedPetitionService },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(StepIndicatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('"_publicCurrentStep$" should emit the received value when "setCurrentStep" is called', () => {
    service._publicCurrentStep$.subscribe((data) => {
      expect(data).toEqual('type');
    });
    service.setCurrentStep('type');
  });
});
