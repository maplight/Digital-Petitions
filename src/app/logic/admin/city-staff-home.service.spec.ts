import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import {
  IssuePetition,
  PetitionsByTypeInput,
  PetitionStatus,
  PetitionType,
} from 'src/app/core/api/API';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedAdminService } from 'src/testing/mocked-admin-service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';
import { PetitionService } from '../petition/petition.service';
import { AdminService } from './admin.service';

import { CityStaffHomeService } from './city-staff-home.service';

describe('CityStaffHomeService', () => {
  let service: CityStaffHomeService;
  let valueServiceSpy: jasmine.SpyObj<PetitionService>;
  beforeEach(() => {
    const spy = jasmine.createSpyObj('PetitionService', [
      'getCityStaffPetitions',
    ]);

    TestBed.configureTestingModule({
      providers: [
        CityStaffHomeService,
        { provide: PetitionService, useValue: spy },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(CityStaffHomeService);
    valueServiceSpy = TestBed.inject(
      PetitionService
    ) as jasmine.SpyObj<PetitionService>;
  });

  it('"result$" should emit a Result<BufferPetition> value when getCityStaffPetitions emit a correct value', () => {
    valueServiceSpy.getCityStaffPetitions.and.returnValue(
      of({ result: { items: [{ dataIssue: mockedIssue }] } })
    );

    service.result$.subscribe((data) => {
      expect(data).toEqual([
        { result: { items: [{ dataIssue: mockedIssue }] } },
        false,
      ]);
    });
    service.getPetitions({}, false);
  });

  it('"success$" should emit a <BufferPetition> value when getCityStaffPetitions emit a correct value', () => {
    valueServiceSpy.getCityStaffPetitions.and.returnValue(
      of({ result: { items: [{ dataIssue: mockedIssue }] } })
    );

    service.success$.subscribe((data) => {
      expect(data).toEqual({
        items: [{ dataIssue: mockedIssue }],
        cursor: undefined,
      });
    });
    service.getPetitions({}, false);
  });

  it('"error$" should emit a "string" value when getCityStaffPetitions emit a error value', () => {
    valueServiceSpy.getCityStaffPetitions.and.returnValue(
      of({ error: 'some error' })
    );

    service.error$.subscribe((data) => {
      expect(data).toEqual('some error');
    });
    service.getPetitions({}, false);
  });

  it('"loading$" should emit a "boolean" value when getCityStaffPetitions emit any value', () => {
    valueServiceSpy.getCityStaffPetitions.and.returnValue(
      of({ result: { items: [{ dataIssue: mockedIssue }] } })
    );

    service.loading$.subscribe((data) => {
      data ? expect(data).toEqual(true) : expect(data).toEqual(false);
    });

    service.getPetitions({}, false);
  });
});

const mockedIssue: IssuePetition = {
  __typename: 'IssuePetition',
  PK: '1',
  createdAt: '',
  detail: 'Text',
  owner: '',
  signatures: {
    __typename: 'SignatureConnection',
    items: [],
    token: undefined,
  },
  status: PetitionStatus.NEW,
  title: 'Title',
  type: PetitionType.ISSUE,
  updatedAt: '',
  version: 0,
};
