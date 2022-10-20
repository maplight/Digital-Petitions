import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AccountService } from 'src/app/core/account-service/account.service';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedAccountService } from 'src/testing/mocked-account-service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';

import { ChangePersonalDetailsService } from './change-personal-details.service';

describe('ChangePersonalDetailsService', () => {
  let service: ChangePersonalDetailsService;

  let valueServiceSpy: jasmine.SpyObj<AccountService>;
  beforeEach(() => {
    const spy = jasmine.createSpyObj('AccountService', [
      'changePersonalDetails',
    ]);
    TestBed.configureTestingModule({
      providers: [
        ChangePersonalDetailsService,
        { provide: AccountService, useValue: spy },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(ChangePersonalDetailsService);
    valueServiceSpy = TestBed.inject(
      AccountService
    ) as jasmine.SpyObj<AccountService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('"result$" should emit a Result<string> value when changePersonalDetails emit a correct value', () => {
    valueServiceSpy.changePersonalDetails.and.returnValue(
      of({
        result: 'success',
      })
    );

    service.result$.subscribe((data) => {
      expect(data).toEqual({
        result: 'success',
      });
    });
    service.setPersonalDetailsToUpdate({
      address: '',
      aptNumber: '',
      city: '',
      firstName: '',
      lastName: '',
      state: '',
      zipCode: '',
    });
  });

  it('"success$" should emit a <string> value when changePersonalDetails emit a correct value', () => {
    valueServiceSpy.changePersonalDetails.and.returnValue(
      of({
        result: 'success',
      })
    );

    service.success$.subscribe((data) => {
      expect(data).toEqual('success');
    });
    service.setPersonalDetailsToUpdate({
      address: '',
      aptNumber: '',
      city: '',
      firstName: '',
      lastName: '',
      state: '',
      zipCode: '',
    });
  });

  it('"error$" should emit "string" value when changePersonalDetails emit a error value', () => {
    valueServiceSpy.changePersonalDetails.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.error$.subscribe((data) => {
      expect(data).toEqual('some error');
    });
    service.setPersonalDetailsToUpdate({
      address: '',
      aptNumber: '',
      city: '',
      firstName: '',
      lastName: '',
      state: '',
      zipCode: '',
    });
  });

  it('"loading$" should emit a "boolean" value when changePersonalDetails emit any value', () => {
    valueServiceSpy.changePersonalDetails.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.loading$.subscribe((data) => {
      data ? expect(data).toEqual(true) : expect(data).toEqual(false);
    });

    service.setPersonalDetailsToUpdate({
      address: '',
      aptNumber: '',
      city: '',
      firstName: '',
      lastName: '',
      state: '',
      zipCode: '',
    });
  });
});
