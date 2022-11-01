import { TestBed } from '@angular/core/testing';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';
import { of } from 'rxjs';

import { GetInactivePetitionsService } from './get-inactive-petitions.service';
import { PetitionService } from './petition.service';
import { BufferPetition } from 'src/app/shared/models/petition/buffer-petitions';

describe('GetInactivePetitionsService', () => {
  let service: GetInactivePetitionsService;

  let valueServiceSpy: jasmine.SpyObj<PetitionService>;
  beforeEach(() => {
    const spy = jasmine.createSpyObj('PetitionService', [
      'getInactivePetitions',
    ]);
    TestBed.configureTestingModule({
      providers: [
        GetInactivePetitionsService,
        { provide: PetitionService, useValue: spy },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(GetInactivePetitionsService);
    valueServiceSpy = TestBed.inject(
      PetitionService
    ) as jasmine.SpyObj<PetitionService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('"result$" should emit a Result<BufferPetition> value when getInactivePetitions emit a correct value', () => {
    valueServiceSpy.getInactivePetitions.and.returnValue(
      of({
        result: _bufferPetition,
      })
    );

    service.result$.subscribe((data) => {
      expect(data).toEqual({
        result: _bufferPetition,
      });
    });
    service.getPetitions({});
  });

  it('"success$" should emit a <BufferPetition> value when getInactivePetitions emit a correct value', () => {
    valueServiceSpy.getInactivePetitions.and.returnValue(
      of({
        result: _bufferPetition,
      })
    );

    service.success$.subscribe((data) => {
      expect(data).toEqual(_bufferPetition);
    });
    service.getPetitions({});
  });

  it('"error$" should emit a "string" value when getInactivePetitions emit a error value', () => {
    valueServiceSpy.getInactivePetitions.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.error$.subscribe((data) => {
      expect(data).toEqual('some error');
    });
    service.getPetitions({});
  });

  it('"loading$" should emit a "boolean" value when getInactivePetitions emit any value', () => {
    valueServiceSpy.getInactivePetitions.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.loading$.subscribe((data) => {
      data ? expect(data).toEqual(true) : expect(data).toEqual(false);
    });

    service.getPetitions({});
  });
});

const _bufferPetition: BufferPetition = {
  items: [],
};
