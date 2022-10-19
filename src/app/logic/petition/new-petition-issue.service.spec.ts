import { TestBed } from '@angular/core/testing';
import {
  IssuePetition,
  PetitionStatus,
  PetitionType,
} from 'src/app/core/api/API';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';
import { of } from 'rxjs';

import { NewPetitionIssueService } from './new-petition-issue.service';
import { PetitionService } from './petition.service';

describe('NewPetitionIssueService', () => {
  let service: NewPetitionIssueService;

  let valueServiceSpy: jasmine.SpyObj<PetitionService>;
  beforeEach(() => {
    const spy = jasmine.createSpyObj('PetitionService', ['newIssuePetition']);
    TestBed.configureTestingModule({
      providers: [
        NewPetitionIssueService,
        { provide: PetitionService, useValue: spy },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(NewPetitionIssueService);
    valueServiceSpy = TestBed.inject(
      PetitionService
    ) as jasmine.SpyObj<PetitionService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('"result$" should emit a Result<IssuePetition> value when newIssuePetition emit a correct value', () => {
    valueServiceSpy.newIssuePetition.and.returnValue(
      of({
        result: _issue,
      })
    );

    service.result$.subscribe((data) => {
      expect(data).toEqual({
        result: _issue,
      });
    });
    service.newIssuePetition({
      detail: '',
      title: '',
    });
  });

  it('"success$" should emit a <IssuePetition> value when newIssuePetition emit a correct value', () => {
    valueServiceSpy.newIssuePetition.and.returnValue(
      of({
        result: _issue,
      })
    );

    service.success$.subscribe((data) => {
      expect(data).toEqual(_issue);
    });
    service.newIssuePetition({
      detail: '',
      title: '',
    });
  });

  it('"error$" should emit a "string" value when newIssuePetition emit a error value', () => {
    valueServiceSpy.newIssuePetition.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.error$.subscribe((data) => {
      expect(data).toEqual('some error');
    });
    service.newIssuePetition({
      detail: '',
      title: '',
    });
  });

  it('"loading$" should emit a "boolean" value when newIssuePetition emit any value', () => {
    valueServiceSpy.newIssuePetition.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.loading$.subscribe((data) => {
      data ? expect(data).toEqual(true) : expect(data).toEqual(false);
    });

    service.newIssuePetition({
      detail: '',
      title: '',
    });
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
