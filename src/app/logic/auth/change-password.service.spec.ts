import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AccountService } from 'src/app/core/account-service/account.service';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedAccountService } from 'src/testing/mocked-account-service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';

import { ChangePasswordService } from './change-password.service';

describe('ChangePasswordService', () => {
  let service: ChangePasswordService;

  let valueServiceSpy: jasmine.SpyObj<AccountService>;
  beforeEach(() => {
    const spy = jasmine.createSpyObj('AccountService', ['changePassword']);
    TestBed.configureTestingModule({
      providers: [
        ChangePasswordService,
        { provide: AccountService, useValue: spy },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(ChangePasswordService);
    valueServiceSpy = TestBed.inject(
      AccountService
    ) as jasmine.SpyObj<AccountService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('"result$" should emit a Result<string> value when changePassword emit a correct value', () => {
    valueServiceSpy.changePassword.and.returnValue(
      of({
        result: 'success',
      })
    );

    service.result$.subscribe((data) => {
      expect(data).toEqual({
        result: 'success',
      });
    });
    service.setPasswordData({ newPassword: '', oldPassword: '' });
  });

  it('"success$" should emit a <string> value when changePassword emit a correct value', () => {
    valueServiceSpy.changePassword.and.returnValue(
      of({
        result: 'success',
      })
    );

    service.success$.subscribe((data) => {
      expect(data).toEqual('success');
    });
    service.setPasswordData({ newPassword: '', oldPassword: '' });
  });

  it('"error$" should emit a "string" value when changePassword emit a error value', () => {
    valueServiceSpy.changePassword.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.error$.subscribe((data) => {
      expect(data).toEqual('some error');
    });
    service.setPasswordData({ newPassword: '', oldPassword: '' });
  });

  it('"loading$" should emit a "boolean" value when changePassword emit any value', () => {
    valueServiceSpy.changePassword.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.loading$.subscribe((data) => {
      data ? expect(data).toEqual(true) : expect(data).toEqual(false);
    });

    service.setPasswordData({ newPassword: '', oldPassword: '' });
  });
});
