import { TestBed } from '@angular/core/testing';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';
import { of } from 'rxjs';
import { MockedSignatureService } from 'src/testing/mocked-signature-service';
import { PetitionService } from '../petition/petition.service';

import { ApproveSignatureService } from './approve-signature.service';
import { SignatureService } from './signature.service';
import {
  Signature,
  SignatureStatus,
  VerificationMethod,
} from 'src/app/core/api/API';

describe('ApproveSignatureService', () => {
  let service: ApproveSignatureService;

  let valueServiceSpy: jasmine.SpyObj<SignatureService>;
  beforeEach(() => {
    const spy = jasmine.createSpyObj('SignatureService', ['approveSignature']);
    TestBed.configureTestingModule({
      providers: [
        ApproveSignatureService,
        { provide: SignatureService, useValue: spy },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(ApproveSignatureService);
    valueServiceSpy = TestBed.inject(
      SignatureService
    ) as jasmine.SpyObj<SignatureService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('"result$" should emit a Result<string> value when approveSignature emit a correct value', () => {
    valueServiceSpy.approveSignature.and.returnValue(
      of({
        result: _signature,
      })
    );

    service.result$.subscribe((data) => {
      expect(data).toEqual({
        result: _signature,
      });
    });
    service.approveSignature({ signatureId: '0' });
  });

  it('"success$" should emit a <string> value when approveSignature emit a correct value', () => {
    valueServiceSpy.approveSignature.and.returnValue(
      of({
        result: _signature,
      })
    );

    service.success$.subscribe((data) => {
      expect(data).toEqual(_signature);
    });
    service.approveSignature({ signatureId: '0' });
  });

  it('"error$" should emit "string" value when approveSignature emit a error value', () => {
    valueServiceSpy.approveSignature.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.error$.subscribe((data) => {
      expect(data).toEqual('some error');
    });
    service.approveSignature({ signatureId: '0' });
  });

  it('"loading$" should emit a "boolean" value when approveSignature emit any value', () => {
    valueServiceSpy.approveSignature.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.loading$.subscribe((data) => {
      data ? expect(data).toEqual(true) : expect(data).toEqual(false);
    });

    service.approveSignature({ signatureId: '0' });
  });
});
const _signature: Signature = {
  __typename: 'Signature',
  PK: '',
  address: '',
  createdAt: '',
  isVerified: false,
  method: VerificationMethod.CALL,
  name: '',
  signer: '',
  status: SignatureStatus.APPROVED,
  updatedAt: '',
};
