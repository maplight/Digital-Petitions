import { TestBed } from '@angular/core/testing';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';
import { of } from 'rxjs';
import { GetPublicPetitionsActiveService } from './get-public-petitions-active.service';
import { PetitionService } from './petition.service';
import { BufferPetition } from 'src/app/shared/models/petition/buffer-petitions';

describe('CommitteeService', () => {
  let service: GetPublicPetitionsActiveService;

  let valueServiceSpy: jasmine.SpyObj<PetitionService>;
  beforeEach(() => {
    const spy = jasmine.createSpyObj('PetitionService', [
      'getAnonymousActivePetitions',
    ]);
    TestBed.configureTestingModule({
      providers: [
        GetPublicPetitionsActiveService,
        { provide: PetitionService, useValue: spy },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(GetPublicPetitionsActiveService);
    valueServiceSpy = TestBed.inject(
      PetitionService
    ) as jasmine.SpyObj<PetitionService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('"result$" should emit a Result<BufferPetition> value when getAnonymousActivePetitions emit a correct value', () => {
    valueServiceSpy.getAnonymousActivePetitions.and.returnValue(
      of({
        result: _bufferPetition,
      })
    );

    service.result$.subscribe((data) => {
      expect(data).toEqual({
        result: _bufferPetition,
      });
    });
    service.getPetitionsAnonymous({});
  });

  it('"success$" should emit a <BufferPetition> value when getAnonymousActivePetitions emit a correct value', () => {
    valueServiceSpy.getAnonymousActivePetitions.and.returnValue(
      of({
        result: _bufferPetition,
      })
    );

    service.success$.subscribe((data) => {
      expect(data).toEqual(_bufferPetition);
    });
    service.getPetitionsAnonymous({});
  });

  it('"error$" should emit a "string" value when getAnonymousActivePetitions emit a error value', () => {
    valueServiceSpy.getAnonymousActivePetitions.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.error$.subscribe((data) => {
      expect(data).toEqual('some error');
    });
    service.getPetitionsAnonymous({});
  });

  it('"loading$" should emit a "boolean" value when getAnonymousActivePetitions emit any value', () => {
    valueServiceSpy.getAnonymousActivePetitions.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.loading$.subscribe((data) => {
      data ? expect(data).toEqual(true) : expect(data).toEqual(false);
    });

    service.getPetitionsAnonymous({});
  });
});

const _bufferPetition: BufferPetition = {
  items: [],
};
