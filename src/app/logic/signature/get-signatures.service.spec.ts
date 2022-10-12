import { TestBed } from '@angular/core/testing';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';
import { MockedPetitionService } from 'src/testing/mocked-pettition-service';
import { MockedSignatureService } from 'src/testing/mocked-signature-service';
import { PetitionService } from '../petition/petition.service';

import { GetSignaturesService } from './get-signatures.service';
import { SignatureService } from './signature.service';

describe('GetSignaturesService', () => {
  let service: GetSignaturesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GetSignaturesService,
        { provide: SignatureService, useClass: MockedSignatureService },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(GetSignaturesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
