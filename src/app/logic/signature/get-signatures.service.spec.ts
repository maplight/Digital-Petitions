import { TestBed } from '@angular/core/testing';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';
import { of } from 'rxjs';
import { MockedSignatureService } from 'src/testing/mocked-signature-service';
import { PetitionService } from '../petition/petition.service';

import { GetSignaturesService } from './get-signatures.service';
import { SignatureService } from './signature.service';

describe('GetSignaturesService', () => {
  let service: GetSignaturesService;

  let valueServiceSpy: jasmine.SpyObj<SignatureService>;
  beforeEach(() => {
    const spy = jasmine.createSpyObj('SignatureService', ['getSignatures']);
    TestBed.configureTestingModule({
      providers: [
        GetSignaturesService,
        { provide: SignatureService, useValue: spy },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(GetSignaturesService);
    valueServiceSpy = TestBed.inject(
      SignatureService
    ) as jasmine.SpyObj<SignatureService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('"result$" should emit a Result<SignatureConnection> value when getSignatures emit a correct value', () => {
    valueServiceSpy.getSignatures.and.returnValue(
      of({
        result: {
          __typename: 'SignatureConnection',
          items: [],
        },
      })
    );

    service.result$.subscribe((data) => {
      expect(data).toEqual({
        result: {
          __typename: 'SignatureConnection',
          items: [],
        },
      });
    });
    service.getSignatures({ petition: '' });
  });

  it('"success$" should emit a <SignatureConnection> value when getSignatures emit a correct value', () => {
    valueServiceSpy.getSignatures.and.returnValue(
      of({
        result: {
          __typename: 'SignatureConnection',
          items: [],
        },
      })
    );

    service.success$.subscribe((data) => {
      expect(data).toEqual({ __typename: 'SignatureConnection', items: [] });
    });
    service.getSignatures({ petition: '' });
  });

  it('"error$" should emit "string" value when getSignatures emit a error value', () => {
    valueServiceSpy.getSignatures.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.error$.subscribe((data) => {
      expect(data).toEqual('some error');
    });
    service.getSignatures({ petition: '' });
  });

  it('"loading$" should emit a "boolean" value when getSignatures emit any value', () => {
    valueServiceSpy.getSignatures.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.loading$.subscribe((data) => {
      data ? expect(data).toEqual(true) : expect(data).toEqual(false);
    });

    service.getSignatures({ petition: '' });
  });
});
