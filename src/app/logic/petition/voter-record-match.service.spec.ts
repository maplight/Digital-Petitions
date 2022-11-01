import { TestBed } from '@angular/core/testing';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';
import { of } from 'rxjs';
import { PetitionService } from './petition.service';

import { VoterRecordMatchService } from './voter-record-match.service';
import { VoterRecordMatch } from 'src/app/core/api/API';

describe('VoterRecordMatchService', () => {
  let service: VoterRecordMatchService;

  let valueServiceSpy: jasmine.SpyObj<PetitionService>;
  beforeEach(() => {
    const spy = jasmine.createSpyObj('PetitionService', [
      'getVoterRecordMatch',
    ]);
    TestBed.configureTestingModule({
      providers: [
        VoterRecordMatchService,
        { provide: PetitionService, useValue: spy },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(VoterRecordMatchService);
    valueServiceSpy = TestBed.inject(
      PetitionService
    ) as jasmine.SpyObj<PetitionService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('"result$" should emit a Result<VoterRecordMatch> value when getVoterRecordMatch emit a correct value', () => {
    valueServiceSpy.getVoterRecordMatch.and.returnValue(
      of({
        result: _voterRecordMatch,
      })
    );

    service.result$.subscribe((data) => {
      expect(data).toEqual({
        result: _voterRecordMatch,
      });
    });
    service.getVoterRecordMatch({
      address: '',
      city: '',
      fullName: '',
      state: '',
      zipCode: '',
    });
  });

  it('"success$" should emit a <VoterRecordMatch> value when getVoterRecordMatch emit a correct value', () => {
    valueServiceSpy.getVoterRecordMatch.and.returnValue(
      of({
        result: _voterRecordMatch,
      })
    );

    service.success$.subscribe((data) => {
      expect(data).toEqual(_voterRecordMatch);
    });
    service.getVoterRecordMatch({
      address: '',
      city: '',
      fullName: '',
      state: '',
      zipCode: '',
    });
  });

  it('"error$" should emit a "string" value when getVoterRecordMatch emit a error value', () => {
    valueServiceSpy.getVoterRecordMatch.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.error$.subscribe((data) => {
      expect(data).toEqual('some error');
    });
    service.getVoterRecordMatch({
      address: '',
      city: '',
      fullName: '',
      state: '',
      zipCode: '',
    });
  });

  it('"loading$" should emit a "boolean" value when getVoterRecordMatch emit any value', () => {
    valueServiceSpy.getVoterRecordMatch.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.loading$.subscribe((data) => {
      data ? expect(data).toEqual(true) : expect(data).toEqual(false);
    });

    service.getVoterRecordMatch({
      address: '',
      city: '',
      fullName: '',
      state: '',
      zipCode: '',
    });
  });
});

const _voterRecordMatch: VoterRecordMatch = {
  __typename: 'VoterRecordMatch',
  address: '',
  city: '',
  fullName: '',
  methods: [],
  state: '',
  zipCode: '',
};
