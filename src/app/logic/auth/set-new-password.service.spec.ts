import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AccountService } from 'src/app/core/account-service/account.service';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedAccountService } from 'src/testing/mocked-account-service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';

import { SetNewPasswordService } from './set-new-password.service';

describe('SetNewPasswordService', () => {
  let service: SetNewPasswordService;

  let valueServiceSpy: jasmine.SpyObj<AccountService>;
  beforeEach(() => {
    const spy = jasmine.createSpyObj('AccountService', ['setNewPassword']);
    TestBed.configureTestingModule({
      providers: [
        SetNewPasswordService,
        { provide: AccountService, useValue: spy },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(SetNewPasswordService);
    valueServiceSpy = TestBed.inject(
      AccountService
    ) as jasmine.SpyObj<AccountService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('"result$" should emit a Result<string> value when setNewPassword emit a correct value', () => {
    valueServiceSpy.setNewPassword.and.returnValue(
      of({
        result: 'success',
      })
    );

    service.result$.subscribe((data) => {
      expect(data).toEqual({
        result: 'success',
      });
    });
    service.newPasswordData({ code: '', newPassword: '', username: '' });
  });

  it('"success$" should emit a <string> value when setNewPassword emit a correct value', () => {
    valueServiceSpy.setNewPassword.and.returnValue(
      of({
        result: 'success',
      })
    );

    service.success$.subscribe((data) => {
      expect(data).toEqual('success');
    });
    service.newPasswordData({ code: '', newPassword: '', username: '' });
  });

  it('"error$" should emit "string" value when setNewPassword emit a error value', () => {
    valueServiceSpy.setNewPassword.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.error$.subscribe((data) => {
      expect(data).toEqual('some error');
    });
    service.newPasswordData({ code: '', newPassword: '', username: '' });
  });

  it('"loading$" should emit a "boolean" value when setNewPassword emit any value', () => {
    valueServiceSpy.setNewPassword.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.loading$.subscribe((data) => {
      data ? expect(data).toEqual(true) : expect(data).toEqual(false);
    });

    service.newPasswordData({ code: '', newPassword: '', username: '' });
  });
});
