import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AccountService } from 'src/app/core/account-service/account.service';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';

import { ForgotPasswordService } from './forgot-password.service';

describe('ForgotPasswordService', () => {
  let service: ForgotPasswordService;
  let valueServiceSpy: jasmine.SpyObj<AccountService>;
  let router: Router;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('AccountService', ['forgotPassword']);
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        ForgotPasswordService,
        { provide: AccountService, useValue: spy },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(ForgotPasswordService);
    router = TestBed.inject(Router);

    valueServiceSpy = TestBed.inject(
      AccountService
    ) as jasmine.SpyObj<AccountService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('"result$" should emit a Result<string> value when forgotPassword emit a correct value', () => {
    valueServiceSpy.forgotPassword.and.returnValue(
      of({
        result: 'success',
      })
    );

    service.result$.subscribe((data) => {
      expect(data).toEqual({
        result: 'success',
      });
    });
    service.recoverPasswordData({ email: '' });
  });

  it('"success$" should emit a <string> value when forgotPassword emit a correct value', () => {
    valueServiceSpy.forgotPassword.and.returnValue(
      of({
        result: 'success',
      })
    );

    let functSpy = spyOn(router, 'navigate');

    service.success$.subscribe((data) => {
      expect(functSpy).toHaveBeenCalled();
    });
    service.recoverPasswordData({ email: 'example@test.com' });
  });

  it('"error$" should emit "string" value when forgotPassword emit a error value', () => {
    valueServiceSpy.forgotPassword.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.error$.subscribe((data) => {
      expect(data).toEqual('some error');
    });
    service.recoverPasswordData({ email: '' });
  });

  it('"loading$" should emit a "boolean" value when forgotPassword emit any value', () => {
    valueServiceSpy.forgotPassword.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.loading$.subscribe((data) => {
      data ? expect(data).toEqual(true) : expect(data).toEqual(false);
    });

    service.recoverPasswordData({ email: '' });
  });
});
