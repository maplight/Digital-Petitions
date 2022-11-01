import { TestBed } from '@angular/core/testing';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';
import { of } from 'rxjs';
import { PetitionService } from './petition.service';

import { SignPetitionService } from './sign-petition.service';
import {
  SignatureVerification,
  SignatureVerificationInput,
  VerificationMethod,
} from 'src/app/core/api/API';

describe('SignPetitionService', () => {
  let service: SignPetitionService;

  let valueServiceSpy: jasmine.SpyObj<PetitionService>;
  beforeEach(() => {
    const spy = jasmine.createSpyObj('PetitionService', ['signPetition']);
    TestBed.configureTestingModule({
      providers: [
        SignPetitionService,
        { provide: PetitionService, useValue: spy },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(SignPetitionService);
    valueServiceSpy = TestBed.inject(
      PetitionService
    ) as jasmine.SpyObj<PetitionService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('"result$" should emit a Result<SignatureVerification> value when signPetition emit a correct value', () => {
    valueServiceSpy.signPetition.and.returnValue(
      of({
        result: _signatureVerification,
      })
    );

    service.result$.subscribe((data) => {
      expect(data).toEqual({
        result: _signatureVerification,
      });
    });
    service.signPetition(_signatureVerificationInput);
  });

  it('"success$" should emit a <SignatureVerification> value when signPetition emit a correct value', () => {
    valueServiceSpy.signPetition.and.returnValue(
      of({
        result: _signatureVerification,
      })
    );

    service.success$.subscribe((data) => {
      expect(data).toEqual(_signatureVerification);
    });
    service.signPetition(_signatureVerificationInput);
  });

  it('"error$" should emit a "string" value when signPetition emit a error value', () => {
    valueServiceSpy.signPetition.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.error$.subscribe((data) => {
      expect(data).toEqual('some error');
    });
    service.signPetition(_signatureVerificationInput);
  });

  it('"loading$" should emit a "boolean" value when signPetition emit any value', () => {
    valueServiceSpy.signPetition.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.loading$.subscribe((data) => {
      data ? expect(data).toEqual(true) : expect(data).toEqual(false);
    });

    service.signPetition(_signatureVerificationInput);
  });
});

const _signatureVerification: SignatureVerification = {
  __typename: 'SignatureVerification',
  address: '',
  city: '',
  confirmationRequired: false,
  fullName: '',
  method: VerificationMethod.CALL,
  methodPayload: [],
  state: '',
  token: '',
  zipCode: '',
};

const _signatureVerificationInput: SignatureVerificationInput = {
  address: '',
  city: '',
  fullName: '',
  method: VerificationMethod.CALL,
  methodPayload: [],
  state: '',
  token: '',
  zipCode: '',
};
