import { TestBed } from '@angular/core/testing';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';
import { of } from 'rxjs';

import { GetPublicPetitionService } from './get-public-petition.service';
import { PetitionService } from './petition.service';
import {
  IssuePetition,
  PetitionStatus,
  PetitionType,
} from 'src/app/core/api/API';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';

describe('GetPublicPetitionService', () => {
  let service: GetPublicPetitionService;

  let valueServiceSpy: jasmine.SpyObj<PetitionService>;
  beforeEach(() => {
    const spy = jasmine.createSpyObj('PetitionService', ['getPublicPetition']);
    TestBed.configureTestingModule({
      providers: [
        GetPublicPetitionService,
        { provide: PetitionService, useValue: spy },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(GetPublicPetitionService);
    valueServiceSpy = TestBed.inject(
      PetitionService
    ) as jasmine.SpyObj<PetitionService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('"result$" should emit a Result<ResponsePetition> value when getPublicPetition emit a correct value', () => {
    valueServiceSpy.getPublicPetition.and.returnValue(
      of({
        result: _responsePetition,
      })
    );

    service.result$.subscribe((data) => {
      expect(data).toEqual({
        result: _responsePetition,
      });
    });
    service.getPetition('');
  });

  it('"success$" should emit a <ResponsePetition> value when getPublicPetition emit a correct value', () => {
    valueServiceSpy.getPublicPetition.and.returnValue(
      of({
        result: _responsePetition,
      })
    );

    service.success$.subscribe((data) => {
      expect(data).toEqual(_responsePetition);
    });
    service.getPetition('');
  });

  it('"error$" should emit a "string" value when getPublicPetition emit a error value', () => {
    valueServiceSpy.getPublicPetition.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.error$.subscribe((data) => {
      expect(data).toEqual('some error');
    });
    service.getPetition('');
  });

  it('"loading$" should emit a "boolean" value when getPublicPetition emit any value', () => {
    valueServiceSpy.getPublicPetition.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.loading$.subscribe((data) => {
      data ? expect(data).toEqual(true) : expect(data).toEqual(false);
    });

    service.getPetition('');
  });
});

const _issue: IssuePetition = {
  __typename: 'IssuePetition',
  PK: '',

  createdAt: '',
  detail: '',
  owner: '',
  title: '',
  signatures: {
    __typename: 'SignatureConnection',
    items: [],
    token: undefined,
  },
  status: PetitionStatus.ACTIVE,
  type: PetitionType.ISSUE,
  updatedAt: '',
  version: 0,
};

const _responsePetition: ResponsePetition = {
  dataIssue: _issue,
};
