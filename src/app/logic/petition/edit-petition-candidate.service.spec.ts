import { TestBed } from '@angular/core/testing';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';
import { of } from 'rxjs';

import { EditPetitionCandidateService } from './edit-petition-candidate.service';
import { PetitionService } from './petition.service';
import {
  CandidatePetition,
  PetitionStatus,
  PetitionType,
} from 'src/app/core/api/API';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';

describe('EditPetitionCandidateService', () => {
  let service: EditPetitionCandidateService;

  let valueServiceSpy: jasmine.SpyObj<PetitionService>;
  beforeEach(() => {
    const spy = jasmine.createSpyObj('PetitionService', [
      'editPetitionCandidate',
    ]);
    TestBed.configureTestingModule({
      providers: [
        EditPetitionCandidateService,
        { provide: PetitionService, useValue: spy },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(EditPetitionCandidateService);
    valueServiceSpy = TestBed.inject(
      PetitionService
    ) as jasmine.SpyObj<PetitionService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('"result$" should emit a Result<CandidatePetition> value when editPetitionCandidate emit a correct value', () => {
    valueServiceSpy.editPetitionCandidate.and.returnValue(
      of({
        result: _candidate,
      })
    );

    service.result$.subscribe((data) => {
      expect(data).toEqual({
        result: _candidate,
      });
    });
    service.editCandidatePetition({
      expectedVersion: 0,
      PK: '',
    });
  });

  it('"success$" should emit a <CandidatePetition> value when editPetitionCandidate emit a correct value', () => {
    valueServiceSpy.editPetitionCandidate.and.returnValue(
      of({
        result: _candidate,
      })
    );

    service.success$.subscribe((data) => {
      expect(data).toEqual(_candidate);
    });
    service.editCandidatePetition({
      expectedVersion: 0,
      PK: '',
    });
  });

  it('"error$" should emit a "string" value when editPetitionCandidate emit a error value', () => {
    valueServiceSpy.editPetitionCandidate.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.error$.subscribe((data) => {
      expect(data).toEqual('some error');
    });
    service.editCandidatePetition({
      expectedVersion: 0,
      PK: '',
    });
  });

  it('"loading$" should emit a "boolean" value when editPetitionCandidate emit any value', () => {
    valueServiceSpy.editPetitionCandidate.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.loading$.subscribe((data) => {
      data ? expect(data).toEqual(true) : expect(data).toEqual(false);
    });

    service.editCandidatePetition({
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
