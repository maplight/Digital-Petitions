import { TestBed } from '@angular/core/testing';
import {
  CandidatePetition,
  PetitionStatus,
  PetitionType,
} from 'src/app/core/api/API';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';
import { of } from 'rxjs';

import { NewPetitionCandidateService } from './new-petition-candidate.service';
import { PetitionService } from './petition.service';

describe('NewPetitionCandidateService', () => {
  let service: NewPetitionCandidateService;

  let valueServiceSpy: jasmine.SpyObj<PetitionService>;
  beforeEach(() => {
    const spy = jasmine.createSpyObj('PetitionService', [
      'newCandidatePetition',
    ]);
    TestBed.configureTestingModule({
      providers: [
        NewPetitionCandidateService,
        { provide: PetitionService, useValue: spy },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(NewPetitionCandidateService);
    valueServiceSpy = TestBed.inject(
      PetitionService
    ) as jasmine.SpyObj<PetitionService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('"result$" should emit a Result<CandidatePetition> value when newCandidatePetition emit a correct value', () => {
    valueServiceSpy.newCandidatePetition.and.returnValue(
      of({
        result: _candidate,
      })
    );

    service.result$.subscribe((data) => {
      expect(data).toEqual({
        result: _candidate,
      });
    });
    service.newCandidatePetition({
      address: { address: '', state: '' },
      name: '',
      office: '',
      party: '',
    });
  });

  it('"success$" should emit a <CandidatePetition> value when newCandidatePetition emit a correct value', () => {
    valueServiceSpy.newCandidatePetition.and.returnValue(
      of({
        result: _candidate,
      })
    );

    service.success$.subscribe((data) => {
      expect(data).toEqual(_candidate);
    });
    service.newCandidatePetition({
      address: { address: '', state: '' },
      name: '',
      office: '',
      party: '',
    });
  });

  it('"error$" should emit a "string" value when newCandidatePetition emit a error value', () => {
    valueServiceSpy.newCandidatePetition.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.error$.subscribe((data) => {
      expect(data).toEqual('some error');
    });
    service.newCandidatePetition({
      address: { address: '', state: '' },
      name: '',
      office: '',
      party: '',
    });
  });

  it('"loading$" should emit a "boolean" value when newCandidatePetition emit any value', () => {
    valueServiceSpy.newCandidatePetition.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.loading$.subscribe((data) => {
      data ? expect(data).toEqual(true) : expect(data).toEqual(false);
    });

    service.newCandidatePetition({
      address: { address: '', state: '' },
      name: '',
      office: '',
      party: '',
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
