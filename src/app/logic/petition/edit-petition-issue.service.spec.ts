import { TestBed } from '@angular/core/testing';
import {
  IssuePetition,
  PetitionStatus,
  PetitionType,
} from 'src/app/core/api/API';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';
import { of } from 'rxjs';

import { EditPetitionIssueService } from './edit-petition-issue.service';
import { PetitionService } from './petition.service';

describe('EditPetitionIssueService', () => {
  let service: EditPetitionIssueService;

  let valueServiceSpy: jasmine.SpyObj<PetitionService>;
  beforeEach(() => {
    const spy = jasmine.createSpyObj('PetitionService', ['editPetitionIssue']);
    TestBed.configureTestingModule({
      providers: [
        EditPetitionIssueService,
        { provide: PetitionService, useValue: spy },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(EditPetitionIssueService);
    valueServiceSpy = TestBed.inject(
      PetitionService
    ) as jasmine.SpyObj<PetitionService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('"result$" should emit a Result<IssuePetition> value when editPetitionIssue emit a correct value', () => {
    valueServiceSpy.editPetitionIssue.and.returnValue(
      of({
        result: _issue,
      })
    );

    service.result$.subscribe((data) => {
      expect(data).toEqual({
        result: _issue,
      });
    });
    service.editIssuePetition({
      expectedVersion: 0,
      PK: '',
    });
  });

  it('"success$" should emit a <IssuePetition> value when editPetitionIssue emit a correct value', () => {
    valueServiceSpy.editPetitionIssue.and.returnValue(
      of({
        result: _issue,
      })
    );

    service.success$.subscribe((data) => {
      expect(data).toEqual(_issue);
    });
    service.editIssuePetition({
      expectedVersion: 0,
      PK: '',
    });
  });

  it('"error$" should emit a "string" value when editPetitionIssue emit a error value', () => {
    valueServiceSpy.editPetitionIssue.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.error$.subscribe((data) => {
      expect(data).toEqual('some error');
    });
    service.editIssuePetition({
      expectedVersion: 0,
      PK: '',
    });
  });

  it('"loading$" should emit a "boolean" value when editPetitionIssue emit any value', () => {
    valueServiceSpy.editPetitionIssue.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.loading$.subscribe((data) => {
      data ? expect(data).toEqual(true) : expect(data).toEqual(false);
    });

    service.editIssuePetition({
      expectedVersion: 0,
      PK: '',
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
