import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AccessLevel, User } from 'src/app/core/api/API';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedAdminService } from 'src/testing/mocked-admin-service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';
import { AdminService } from './admin.service';

import { ChangeAccountPermissionService } from './change-account-permission.service';

describe('ChangeAccountPermissionService', () => {
  let service: ChangeAccountPermissionService;
  let valueServiceSpy: jasmine.SpyObj<AdminService>;
  beforeEach(() => {
    const spy = jasmine.createSpyObj('AdminService', [
      'changeAccountPermission',
    ]);
    TestBed.configureTestingModule({
      providers: [
        ChangeAccountPermissionService,
        { provide: AdminService, useValue: spy },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(ChangeAccountPermissionService);
    valueServiceSpy = TestBed.inject(
      AdminService
    ) as jasmine.SpyObj<AdminService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('"result$" should emit a Result<User> value when changeAccountPermission emit a correct value', () => {
    valueServiceSpy.changeAccountPermission.and.returnValue(
      of({
        result: {
          __typename: 'User',
          email: '',
          permissions: AccessLevel.ADMIN,
          username: '',
        },
      })
    );

    service.result$.subscribe((data) => {
      expect(data).toEqual({
        result: {
          __typename: 'User',
          email: '',
          permissions: AccessLevel.ADMIN,
          username: '',
        },
      });
    });
    service.updateUserAccessInput({
      permissions: AccessLevel.ADMIN,
      username: '',
    });
  });

  it('"success$" should emit a <User> value when changeAccountPermission emit a correct value', () => {
    valueServiceSpy.changeAccountPermission.and.returnValue(
      of({
        result: {
          __typename: 'User',
          email: '',
          permissions: AccessLevel.ADMIN,
          username: '',
        },
      })
    );

    service.success$.subscribe((data) => {
      expect(data).toEqual({
        __typename: 'User',
        email: '',
        permissions: AccessLevel.ADMIN,
        username: '',
      });
    });
    service.updateUserAccessInput({
      permissions: AccessLevel.ADMIN,
      username: '',
    });
  });

  it('"error$" should emit a "string" value when changeAccountPermission emit a error value', () => {
    valueServiceSpy.changeAccountPermission.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.error$.subscribe((data) => {
      expect(data).toEqual('some error');
    });
    service.updateUserAccessInput({
      permissions: AccessLevel.ADMIN,
      username: '',
    });
  });

  it('"loading$" should emit a "boolean" value when changeAccountPermission emit any value', () => {
    valueServiceSpy.changeAccountPermission.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.loading$.subscribe((data) => {
      data ? expect(data).toEqual(true) : expect(data).toEqual(false);
    });

    service.updateUserAccessInput({
      permissions: AccessLevel.ADMIN,
      username: '',
    });
  });
});
