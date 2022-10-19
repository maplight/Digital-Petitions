import { TestBed } from '@angular/core/testing';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';
import { of } from 'rxjs';

import { ConfirmSignPetitionService } from './confirm-sign-petition.service';
import { PetitionService } from './petition.service';
import {
  CandidatePetition,
  CodeSubmissionResult,
  PetitionStatus,
  PetitionType,
} from 'src/app/core/api/API';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';

describe('ConfirmSignPetitionService', () => {
  let service: ConfirmSignPetitionService;

  let valueServiceSpy: jasmine.SpyObj<PetitionService>;
  beforeEach(() => {
    const spy = jasmine.createSpyObj('PetitionService', [
      'confirmSignaturePetition',
    ]);
    TestBed.configureTestingModule({
      providers: [
        ConfirmSignPetitionService,
        { provide: PetitionService, useValue: spy },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(ConfirmSignPetitionService);
    valueServiceSpy = TestBed.inject(
      PetitionService
    ) as jasmine.SpyObj<PetitionService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('"result$" should emit a Result<CodeSubmissionResult> value when confirmSignaturePetition emit a correct value', () => {
    valueServiceSpy.confirmSignaturePetition.and.returnValue(
      of({
        result: _codeSubmissionResult,
      })
    );

    service.result$.subscribe((data) => {
      expect(data).toEqual({
        result: _codeSubmissionResult,
      });
    });
    service.setConfirmationCode('');
  });

  it('"success$" should emit a <CodeSubmissionResult> value when confirmSignaturePetition emit a correct value', () => {
    valueServiceSpy.confirmSignaturePetition.and.returnValue(
      of({
        result: _codeSubmissionResult,
      })
    );

    service.success$.subscribe((data) => {
      expect(data).toEqual(_codeSubmissionResult);
    });
    service.setConfirmationCode('');
  });

  it('"error$" should emit a "string" value when confirmSignaturePetition emit a error value', () => {
    valueServiceSpy.confirmSignaturePetition.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.error$.subscribe((data) => {
      expect(data).toEqual('some error');
    });
    service.setConfirmationCode('');
  });

  it('"loading$" should emit a "boolean" value when confirmSignaturePetition emit any value', () => {
    valueServiceSpy.confirmSignaturePetition.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.loading$.subscribe((data) => {
      data ? expect(data).toEqual(true) : expect(data).toEqual(false);
    });

    service.setConfirmationCode('');
  });
});

const _candidate: CandidatePetition = {
  __typename: 'CandidatePetition',
  PK: '',
  address: {
    __typename: 'AddressData',
    address: '',
    city: undefined,
    number: undefined,
    state: '',
    zipCode: undefined,
  },
  createdAt: '',
  name: '',
  office: '',
  owner: '',
  party: '',
  signatures: {
    __typename: 'SignatureConnection',
    items: [],
    token: undefined,
  },
  status: PetitionStatus.ACTIVE,
  type: PetitionType.CANDIDATE,
  updatedAt: '',
  version: 0,
};
const _responsePetition: ResponsePetition = {
  dataCandidate: _candidate,
};
const _codeSubmissionResult: CodeSubmissionResult = {
  __typename: 'CodeSubmissionResult',
  error: true,
  message: 'error',
};
