import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AccountService } from 'src/app/core/account-service/account.service';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedAccountService } from 'src/testing/mocked-account-service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';

import { CheckTokenFpService } from './check-token-fp.service';

describe('CheckTokenFpService', () => {
  let service: CheckTokenFpService;

  let valueServiceSpy: jasmine.SpyObj<AccountService>;
  beforeEach(() => {
    const spy = jasmine.createSpyObj('AccountService', ['checkTokenFP']);
    TestBed.configureTestingModule({
      providers: [
        CheckTokenFpService,
        { provide: AccountService, useValue: spy },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(CheckTokenFpService);
    valueServiceSpy = TestBed.inject(
      AccountService
    ) as jasmine.SpyObj<AccountService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('"result$" should emit a Result<string> value when checkTokenFP emit a correct value', () => {
    valueServiceSpy.checkTokenFP.and.returnValue(
      of({
        result: 'success',
      })
    );

    service.result$.subscribe((data) => {
      expect(data).toEqual({
        result: 'success',
      });
    });
    service.sendToken({
      code: '',
    });
  });

  it('"success$" should emit a <string> value when checkTokenFP emit a correct value', () => {
    valueServiceSpy.checkTokenFP.and.returnValue(
      of({
        result: 'success',
      })
    );

    service.success$.subscribe((data) => {
      expect(data).toEqual('success');
    });
    service.sendToken({
      code: '',
    });
  });

  it('"error$" should emit "string" value when checkTokenFP emit a error value', () => {
    valueServiceSpy.checkTokenFP.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.error$.subscribe((data) => {
      expect(data).toEqual('some error');
    });
    service.sendToken({
      code: '',
    });
  });

  it('"loading$" should emit a "boolean" value when checkTokenFP emit any value', () => {
    valueServiceSpy.checkTokenFP.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.loading$.subscribe((data) => {
      data ? expect(data).toEqual(true) : expect(data).toEqual(false);
    });

    service.sendToken({
      code: '',
    });
  });
});
