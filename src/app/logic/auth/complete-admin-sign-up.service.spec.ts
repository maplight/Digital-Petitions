import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AccountService } from 'src/app/core/account-service/account.service';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedAccountService } from 'src/testing/mocked-account-service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';

import { CompleteAdminSignUpService } from './complete-admin-sign-up.service';

describe('CompleteNewPasswordService', () => {
  let service: CompleteAdminSignUpService;

  let valueServiceSpy: jasmine.SpyObj<AccountService>;
  beforeEach(() => {
    const spy = jasmine.createSpyObj('AccountService', ['completeNewPassword']);
    TestBed.configureTestingModule({
      providers: [
        CompleteAdminSignUpService,
        { provide: AccountService, useValue: spy },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(CompleteAdminSignUpService);
    valueServiceSpy = TestBed.inject(
      AccountService
    ) as jasmine.SpyObj<AccountService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('"result$" should emit a Result<CognitoUserFacade> value when completeNewPassword emit a correct value', () => {
    valueServiceSpy.completeNewPassword.and.returnValue(
      of({
        result: {
          attributes: {
            sub: '',
            address: '',
            email_verified: false,
            given_name: '',
            'custom:access_group': 'city_staff_guest',
            family_name: '',
            email: '',
          },
          challengeName: 'NEW_PASSWORD_REQUIRED',
          username: '',
        },
      })
    );

    service.result$.subscribe((data) => {
      expect(data).toEqual({
        result: {
          attributes: {
            sub: '',
            address: '',
            email_verified: false,
            given_name: '',
            'custom:access_group': 'city_staff_guest',
            family_name: '',
            email: '',
          },
          challengeName: 'NEW_PASSWORD_REQUIRED',
          username: '',
        },
      });
    });
    service.completeSignUp({ firstName: '', lastName: '', password: '' });
  });

  it('"success$" should emit a <CognitoUserFacade> value when completeNewPassword emit a correct value', () => {
    valueServiceSpy.completeNewPassword.and.returnValue(
      of({
        result: {
          attributes: {
            sub: '',
            address: '',
            email_verified: false,
            given_name: '',
            'custom:access_group': 'city_staff_guest',
            family_name: '',
            email: '',
          },
          challengeName: 'NEW_PASSWORD_REQUIRED',
          username: '',
        },
      })
    );

    service.success$.subscribe((data) => {
      expect(data).toEqual({
        attributes: {
          sub: '',
          address: '',
          email_verified: false,
          given_name: '',
          'custom:access_group': 'city_staff_guest',
          family_name: '',
          email: '',
        },
        challengeName: 'NEW_PASSWORD_REQUIRED',
        username: '',
      });
    });
    service.completeSignUp({ firstName: '', lastName: '', password: '' });
  });

  it('"error$" should emit "string" value when completeNewPassword emit a error value', () => {
    valueServiceSpy.completeNewPassword.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.error$.subscribe((data) => {
      expect(data).toEqual('some error');
    });
    service.completeSignUp({ firstName: '', lastName: '', password: '' });
  });

  it('"loading$" should emit a "boolean" value when completeNewPassword emit any value', () => {
    valueServiceSpy.completeNewPassword.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.loading$.subscribe((data) => {
      data ? expect(data).toEqual(true) : expect(data).toEqual(false);
    });

    service.completeSignUp({ firstName: '', lastName: '', password: '' });
  });
});
