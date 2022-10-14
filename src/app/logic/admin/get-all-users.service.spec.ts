import { TestBed } from '@angular/core/testing';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedAdminService } from 'src/testing/mocked-admin-service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';
import { AdminService } from './admin.service';
import { of } from 'rxjs';
import { GetAllUsersService } from './get-all-users.service';
import { AccessLevel } from 'src/app/core/api/API';

describe('GetAllUsersService', () => {
  let service: GetAllUsersService;

  let valueServiceSpy: jasmine.SpyObj<AdminService>;
  beforeEach(() => {
    const spy = jasmine.createSpyObj('AdminService', ['getAllUser']);
    TestBed.configureTestingModule({
      providers: [
        GetAllUsersService,
        { provide: AdminService, useValue: spy },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(GetAllUsersService);
    valueServiceSpy = TestBed.inject(
      AdminService
    ) as jasmine.SpyObj<AdminService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('"result$" should emit a Result<UserConnection> value when getAllUser emit a correct value', () => {
    valueServiceSpy.getAllUser.and.returnValue(
      of({
        result: {
          __typename: 'UserConnection',
          items: [
            {
              __typename: 'User',
              email: '',
              permissions: AccessLevel.ADMIN,
              username: '',
            },
          ],
        },
      })
    );

    service.result$.subscribe((data) => {
      expect(data).toEqual({
        result: {
          __typename: 'UserConnection',
          items: [
            {
              __typename: 'User',
              email: '',
              permissions: AccessLevel.ADMIN,
              username: '',
            },
          ],
        },
      });
    });
    service.getMembers(false);
  });

  it('"success$" should emit a <UserConnection> value when getAllUser emit a correct value', () => {
    valueServiceSpy.getAllUser.and.returnValue(
      of({
        result: {
          __typename: 'UserConnection',
          items: [
            {
              __typename: 'User',
              email: '',
              permissions: AccessLevel.ADMIN,
              username: '',
            },
          ],
        },
      })
    );

    service.success$.subscribe((data) => {
      expect(data).toEqual({
        __typename: 'UserConnection',
        items: [
          {
            __typename: 'User',
            email: '',
            permissions: AccessLevel.ADMIN,
            username: '',
          },
        ],
      });
    });
    service.getMembers(false);
  });

  it('"error$" should emit a "string" value when getAllUser emit a error value', () => {
    valueServiceSpy.getAllUser.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.error$.subscribe((data) => {
      expect(data).toEqual('some error');
    });
    service.getMembers(false);
  });

  it('"loading$" should emit a "boolean" value when getAllUser emit any value', () => {
    valueServiceSpy.getAllUser.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.loading$.subscribe((data) => {
      data ? expect(data).toEqual(true) : expect(data).toEqual(false);
    });

    service.getMembers(false);
  });
});
