import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AccountService } from 'src/app/core/account-service/account.service';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedAccountService } from 'src/testing/mocked-account-service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';

import { SignUpService } from './sign-up.service';

describe('SignUpService', () => {
  let service: SignUpService;
  let router: Router;

  let valueServiceSpy: jasmine.SpyObj<AccountService>;
  beforeEach(() => {
    const spy = jasmine.createSpyObj('AccountService', ['signUp']);
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        SignUpService,
        { provide: AccountService, useValue: spy },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(SignUpService);
    router = TestBed.inject(Router);
    valueServiceSpy = TestBed.inject(
      AccountService
    ) as jasmine.SpyObj<AccountService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('"result$" should emit a Result<UserConnection> value when getAllUser emit a correct value', () => {
    valueServiceSpy.signUp.and.returnValue(
      of({
        result: 'success',
      })
    );

    service.result$.subscribe((data) => {
      expect(data).toEqual({
        result: 'success',
      });
    });
    service.signUpCredentials({
      address: '',
      aptNumber: '',
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      state: '',
      zipCode: '',
    });
  });

  it('"success$" should emit a <signUp> value when signUp emit a correct value', () => {
    valueServiceSpy.signUp.and.returnValue(
      of({
        result: 'success',
      })
    );
    let functSpy = spyOn(router, 'navigate');

    service.success$.subscribe((data) => {
      expect(functSpy).toHaveBeenCalled();
    });
    service.signUpCredentials({
      address: '',
      aptNumber: '',
      email: 'example@test.com',
      firstName: '',
      lastName: '',
      password: '',
      state: '',
      zipCode: '',
    });
  });

  it('"error$" should emit "string" value when signUp emit a error value', () => {
    valueServiceSpy.signUp.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.error$.subscribe((data) => {
      expect(data).toEqual('some error');
    });
    service.signUpCredentials({
      address: '',
      aptNumber: '',
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      state: '',
      zipCode: '',
    });
  });

  it('"loading$" should emit a "boolean" value when signUp emit any value', () => {
    valueServiceSpy.signUp.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.loading$.subscribe((data) => {
      data ? expect(data).toEqual(true) : expect(data).toEqual(false);
    });

    service.signUpCredentials({
      address: '',
      aptNumber: '',
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      state: '',
      zipCode: '',
    });
  });
});
