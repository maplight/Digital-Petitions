import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AccountService } from 'src/app/core/account-service/account.service';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedAccountService } from 'src/testing/mocked-account-service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';

import { SignInService } from './sign-in.service';

describe('SignInService', () => {
  let service: SignInService;

  let valueServiceSpy: jasmine.SpyObj<AccountService>;
  beforeEach(() => {
    const spy = jasmine.createSpyObj('AccountService', ['signIn']);
    TestBed.configureTestingModule({
      providers: [
        SignInService,
        { provide: AccountService, useValue: spy },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(SignInService);
    valueServiceSpy = TestBed.inject(
      AccountService
    ) as jasmine.SpyObj<AccountService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('"result$" should emit a Result<CognitoUserFacade> value when signIn emit a correct value', () => {
    valueServiceSpy.signIn.and.returnValue(
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
    service.requestSignIn({ email: '', password: '' });
  });

  it('"success$" should emit a <CognitoUserFacade> value when signIn emit a correct value', () => {
    valueServiceSpy.signIn.and.returnValue(
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
    service.requestSignIn({ email: '', password: '' });
  });

  it('"error$" should emit "string" value when signIn emit a error value', () => {
    valueServiceSpy.signIn.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.error$.subscribe((data) => {
      expect(data).toEqual('some error');
    });
    service.requestSignIn({ email: '', password: '' });
  });

  it('"loading$" should emit a "boolean" value when signIn emit any value', () => {
    valueServiceSpy.signIn.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.loading$.subscribe((data) => {
      data ? expect(data).toEqual(true) : expect(data).toEqual(false);
    });

    service.requestSignIn({ email: '', password: '' });
  });
});
