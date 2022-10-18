import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AccountService } from 'src/app/core/account-service/account.service';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedAccountService } from 'src/testing/mocked-account-service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';

import { ChangeEmailService } from './change-email.service';

describe('ChangeEmailService', () => {
  let service: ChangeEmailService;

  let valueServiceSpy: jasmine.SpyObj<AccountService>;
  beforeEach(() => {
    const spy = jasmine.createSpyObj('AccountService', ['changeEmail']);
    TestBed.configureTestingModule({
      providers: [
        ChangeEmailService,
        { provide: AccountService, useValue: spy },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(ChangeEmailService);
    valueServiceSpy = TestBed.inject(
      AccountService
    ) as jasmine.SpyObj<AccountService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('"result$" should emit a Result<string> value when changeEmail emit a correct value', () => {
    valueServiceSpy.changeEmail.and.returnValue(
      of({
        result: 'success',
      })
    );

    service.result$.subscribe((data) => {
      expect(data).toEqual({
        result: 'success',
      });
    });
    service.setChangeEmailData({ email: '' });
  });

  it('"success$" should emit a <string> value when changeEmail emit a correct value', () => {
    valueServiceSpy.changeEmail.and.returnValue(
      of({
        result: 'success',
      })
    );

    service.success$.subscribe((data) => {
      expect(data).toEqual('success');
    });
    service.setChangeEmailData({ email: '' });
  });

  it('"error$" should emit a "string" value when changeEmail emit a error value', () => {
    valueServiceSpy.changeEmail.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.error$.subscribe((data) => {
      expect(data).toEqual('some error');
    });
    service.setChangeEmailData({ email: '' });
  });

  it('"loading$" should emit a "boolean" value when changeEmail emit any value', () => {
    valueServiceSpy.changeEmail.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.loading$.subscribe((data) => {
      data ? expect(data).toEqual(true) : expect(data).toEqual(false);
    });

    service.setChangeEmailData({ email: '' });
  });
});
