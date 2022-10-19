import { TestBed } from '@angular/core/testing';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';
import { of } from 'rxjs';

import { ApprovePetitionService } from './approve-petition.service';
import { PetitionService } from './petition.service';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';
import {
  CandidatePetition,
  PetitionStatus,
  PetitionType,
} from 'src/app/core/api/API';

describe('ChangePetitionStatusService', () => {
  let service: ApprovePetitionService;

  let valueServiceSpy: jasmine.SpyObj<PetitionService>;
  beforeEach(() => {
    const spy = jasmine.createSpyObj('PetitionService', ['approvePetition']);
    TestBed.configureTestingModule({
      providers: [
        ApprovePetitionService,
        { provide: PetitionService, useValue: spy },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(ApprovePetitionService);
    valueServiceSpy = TestBed.inject(
      PetitionService
    ) as jasmine.SpyObj<PetitionService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('"result$" should emit a Result<ResponsePetition> value when approvePetition emit a correct value', () => {
    valueServiceSpy.approvePetition.and.returnValue(
      of({
        result: _responsePetition,
      })
    );

    service.result$.subscribe((data) => {
      expect(data).toEqual({
        result: _responsePetition,
      });
    });
    service.approvePetition({
      deadline: '',
      expectedVersion: 0,
      PK: '',
      requiredSignatures: 0,
    });
  });

  it('"success$" should emit a <ResponsePetition> value when approvePetition emit a correct value', () => {
    valueServiceSpy.approvePetition.and.returnValue(
      of({
        result: _responsePetition,
      })
    );

    service.success$.subscribe((data) => {
      expect(data).toEqual(_responsePetition);
    });
    service.approvePetition({
      deadline: '',
      expectedVersion: 0,
      PK: '',
      requiredSignatures: 0,
    });
  });

  it('"error$" should emit a "string" value when approvePetition emit a error value', () => {
    valueServiceSpy.approvePetition.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.error$.subscribe((data) => {
      expect(data).toEqual('some error');
    });
    service.approvePetition({
      deadline: '',
      expectedVersion: 0,
      PK: '',
      requiredSignatures: 0,
    });
  });

  it('"loading$" should emit a "boolean" value when approvePetition emit any value', () => {
    valueServiceSpy.approvePetition.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.loading$.subscribe((data) => {
      data ? expect(data).toEqual(true) : expect(data).toEqual(false);
    });

    service.approvePetition({
      deadline: '',
      expectedVersion: 0,
      PK: '',
      requiredSignatures: 0,
    });
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
