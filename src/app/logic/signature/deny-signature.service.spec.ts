import { TestBed } from '@angular/core/testing';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';
import { MockedPetitionService } from 'src/testing/mocked-pettition-service';
import { MockedSignatureService } from 'src/testing/mocked-signature-service';
import { PetitionService } from '../petition/petition.service';

import { DenySignatureService } from './deny-signature.service';
import { SignatureService } from './signature.service';

describe('DenySignatureService', () => {
  let service: DenySignatureService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DenySignatureService,
        { provide: SignatureService, useClass: MockedSignatureService },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(DenySignatureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
