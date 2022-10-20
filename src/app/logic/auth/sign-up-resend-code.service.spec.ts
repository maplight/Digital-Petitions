import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AccountService } from 'src/app/core/account-service/account.service';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedAccountService } from 'src/testing/mocked-account-service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';

import { SignUpResendCodeService } from './sign-up-resend-code.service';

describe('SignUpResendCodeService', () => {
  let service: SignUpResendCodeService;

  let valueServiceSpy: jasmine.SpyObj<AccountService>;
  beforeEach(() => {
    const spy = jasmine.createSpyObj('AccountService', ['resendSignUp']);
    TestBed.configureTestingModule({
      providers: [
        SignUpResendCodeService,
        { provide: AccountService, useValue: spy },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(SignUpResendCodeService);
    valueServiceSpy = TestBed.inject(
      AccountService
    ) as jasmine.SpyObj<AccountService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('"result$" should emit a Result<string> value when resendSignUp emit a correct value', () => {
    valueServiceSpy.resendSignUp.and.returnValue(
      of({
        result: 'success',
      })
    );

    service.result$.subscribe((data) => {
      expect(data).toEqual({
        result: 'success',
      });
    });
    service.resendCode('');
  });

  it('"success$" should emit a <string> value when resendSignUp emit a correct value', () => {
    valueServiceSpy.resendSignUp.and.returnValue(
      of({
        result: 'success',
      })
    );

    service.success$.subscribe((data) => {
      expect(data).toEqual('A new code has been sent to your email');
    });
    service.resendCode('');
  });

  it('"error$" should emit "string" value when resendSignUp emit a error value', () => {
    valueServiceSpy.resendSignUp.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.error$.subscribe((data) => {
      expect(data).toEqual('some error');
    });
    service.resendCode('');
  });

  it('"loading$" should emit a "boolean" value when resendSignUp emit any value', () => {
    valueServiceSpy.resendSignUp.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.loading$.subscribe((data) => {
      data ? expect(data).toEqual(true) : expect(data).toEqual(false);
    });

    service.resendCode('');
  });
});
