import { TestBed } from '@angular/core/testing';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';
import { of } from 'rxjs';

import { ApprovePetitionService } from './approve-petition.service';
import { DenyPetitionService } from './deny-petition.service';
import { PetitionService } from './petition.service';
import {
  CandidatePetition,
  PetitionStatus,
  PetitionType,
} from 'src/app/core/api/API';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';

describe('DenyPetitionService', () => {
  let service: DenyPetitionService;

  let valueServiceSpy: jasmine.SpyObj<PetitionService>;
  beforeEach(() => {
    const spy = jasmine.createSpyObj('PetitionService', ['denyPetition']);
    TestBed.configureTestingModule({
      providers: [
        DenyPetitionService,
        { provide: PetitionService, useValue: spy },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(DenyPetitionService);
    valueServiceSpy = TestBed.inject(
      PetitionService
    ) as jasmine.SpyObj<PetitionService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('"result$" should emit a Result<ResponsePetition> value when denyPetition emit a correct value', () => {
    valueServiceSpy.denyPetition.and.returnValue(
      of({
        result: _responsePetition,
      })
    );

    service.result$.subscribe((data) => {
      expect(data).toEqual({
        result: _responsePetition,
      });
    });
    service.denyPetition({
      expectedVersion: 0,
      PK: '',
    });
  });

  it('"success$" should emit a <ResponsePetition> value when denyPetition emit a correct value', () => {
    valueServiceSpy.denyPetition.and.returnValue(
      of({
        result: _responsePetition,
      })
    );

    service.success$.subscribe((data) => {
      expect(data).toEqual(_responsePetition);
    });
    service.denyPetition({
      expectedVersion: 0,
      PK: '',
    });
  });

  it('"error$" should emit a "string" value when denyPetition emit a error value', () => {
    valueServiceSpy.denyPetition.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.error$.subscribe((data) => {
      expect(data).toEqual('some error');
    });
    service.denyPetition({
      expectedVersion: 0,
      PK: '',
    });
  });

  it('"loading$" should emit a "boolean" value when denyPetition emit any value', () => {
    valueServiceSpy.denyPetition.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.loading$.subscribe((data) => {
      data ? expect(data).toEqual(true) : expect(data).toEqual(false);
    });

    service.denyPetition({
      expectedVersion: 0,
      PK: '',
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
