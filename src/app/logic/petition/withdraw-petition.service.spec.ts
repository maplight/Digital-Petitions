import { TestBed } from '@angular/core/testing';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';
import { of } from 'rxjs';
import { PetitionService } from './petition.service';

import { WithdrawPetitionService } from './withdraw-petition.service';

describe('WithdrawPetitionService', () => {
  let service: WithdrawPetitionService;

  let valueServiceSpy: jasmine.SpyObj<PetitionService>;
  beforeEach(() => {
    const spy = jasmine.createSpyObj('PetitionService', ['withdrawPetition']);
    TestBed.configureTestingModule({
      providers: [
        WithdrawPetitionService,
        { provide: PetitionService, useValue: spy },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(WithdrawPetitionService);
    valueServiceSpy = TestBed.inject(
      PetitionService
    ) as jasmine.SpyObj<PetitionService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('"result$" should emit a Result<string> value when withdrawPetition emit a correct value', () => {
    valueServiceSpy.withdrawPetition.and.returnValue(
      of({
        result: 'success',
      })
    );

    service.result$.subscribe((data) => {
      expect(data).toEqual({
        result: 'success',
      });
    });
    service.withdrawPetition(1);
  });

  it('"success$" should emit a <string> value when withdrawPetition emit a correct value', () => {
    valueServiceSpy.withdrawPetition.and.returnValue(
      of({
        result: 'success',
      })
    );

    service.success$.subscribe((data) => {
      expect(data).toEqual('success');
    });
    service.withdrawPetition(1);
  });

  it('"error$" should emit a "string" value when withdrawPetition emit a error value', () => {
    valueServiceSpy.withdrawPetition.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.error$.subscribe((data) => {
      expect(data).toEqual('some error');
    });
    service.withdrawPetition(1);
  });

  it('"loading$" should emit a "boolean" value when withdrawPetition emit any value', () => {
    valueServiceSpy.withdrawPetition.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.loading$.subscribe((data) => {
      data ? expect(data).toEqual(true) : expect(data).toEqual(false);
    });

    service.withdrawPetition(1);
  });
});
