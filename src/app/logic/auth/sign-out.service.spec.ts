import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AccountService } from 'src/app/core/account-service/account.service';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedAccountService } from 'src/testing/mocked-account-service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';

import { SignOutService } from './sign-out.service';

describe('SignOutService', () => {
  let service: SignOutService;

  let valueServiceSpy: jasmine.SpyObj<AccountService>;
  beforeEach(() => {
    const spy = jasmine.createSpyObj('AccountService', ['signOut']);
    TestBed.configureTestingModule({
      providers: [
        SignOutService,
        { provide: AccountService, useValue: spy },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(SignOutService);
    valueServiceSpy = TestBed.inject(
      AccountService
    ) as jasmine.SpyObj<AccountService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('"result$" should emit a Result<string> value when signOut emit a correct value', () => {
    valueServiceSpy.signOut.and.returnValue(
      of({
        result: 'success',
      })
    );

    service.result$.subscribe((data) => {
      expect(data).toEqual({
        result: 'success',
      });
    });
    service.signOut();
  });

  it('"success$" should emit a <string> value when signOut emit a correct value', () => {
    valueServiceSpy.signOut.and.returnValue(
      of({
        result: 'success',
      })
    );

    service.success$.subscribe((data) => {
      expect(data).toEqual('success');
    });
    service.signOut();
  });

  it('"error$" should emit "string" value when signOut emit a error value', () => {
    valueServiceSpy.signOut.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.error$.subscribe((data) => {
      expect(data).toEqual('some error');
    });
    service.signOut();
  });

  it('"loading$" should emit a "boolean" value when signOut emit any value', () => {
    valueServiceSpy.signOut.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.loading$.subscribe((data) => {
      data ? expect(data).toEqual(true) : expect(data).toEqual(false);
    });

    service.signOut();
  });
});
