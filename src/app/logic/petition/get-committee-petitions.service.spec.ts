import { TestBed } from '@angular/core/testing';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';
import { of } from 'rxjs';

import { GetCommitteePetitionsService } from './get-committee-petitions.service';
import { PetitionService } from './petition.service';
import {
  IssuePetition,
  PetitionStatus,
  PetitionType,
} from 'src/app/core/api/API';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';
import { BufferPetition } from 'src/app/shared/models/petition/buffer-petitions';

describe('CommitteeService', () => {
  let service: GetCommitteePetitionsService;

  let valueServiceSpy: jasmine.SpyObj<PetitionService>;
  beforeEach(() => {
    const spy = jasmine.createSpyObj('PetitionService', [
      'getCommitteePetitions',
    ]);
    TestBed.configureTestingModule({
      providers: [
        GetCommitteePetitionsService,
        { provide: PetitionService, useValue: spy },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(GetCommitteePetitionsService);
    valueServiceSpy = TestBed.inject(
      PetitionService
    ) as jasmine.SpyObj<PetitionService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('"result$" should emit a Result<BufferPetition> value when getCommitteePetitions emit a correct value', () => {
    valueServiceSpy.getCommitteePetitions.and.returnValue(
      of({
        result: _bufferPetition,
      })
    );

    service.result$.subscribe((data) => {
      expect(data).toEqual({
        result: _bufferPetition,
      });
    });
    service.getPetitions({ owner: '' });
  });

  it('"success$" should emit a <BufferPetition> value when getCommitteePetitions emit a correct value', () => {
    valueServiceSpy.getCommitteePetitions.and.returnValue(
      of({
        result: _bufferPetition,
      })
    );

    service.success$.subscribe((data) => {
      expect(data).toEqual(_bufferPetition);
    });
    service.getPetitions({ owner: '' });
  });

  it('"error$" should emit a "string" value when getCommitteePetitions emit a error value', () => {
    valueServiceSpy.getCommitteePetitions.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.error$.subscribe((data) => {
      expect(data).toEqual('some error');
    });
    service.getPetitions({ owner: '' });
  });

  it('"loading$" should emit a "boolean" value when getCommitteePetitions emit any value', () => {
    valueServiceSpy.getCommitteePetitions.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.loading$.subscribe((data) => {
      data ? expect(data).toEqual(true) : expect(data).toEqual(false);
    });

    service.getPetitions({ owner: '' });
  });
});

const _bufferPetition: BufferPetition = {
  items: [],
};
