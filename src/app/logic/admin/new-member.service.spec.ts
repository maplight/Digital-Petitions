import { TestBed } from '@angular/core/testing';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { of } from 'rxjs';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';
import { AdminService } from './admin.service';

import { NewMemberService } from './new-member.service';
import { AccessLevel, StaffAccessLevel } from 'src/app/core/api/API';

describe('NewMemberService', () => {
  let service: NewMemberService;

  let valueServiceSpy: jasmine.SpyObj<AdminService>;
  beforeEach(() => {
    const spy = jasmine.createSpyObj('AdminService', ['newMember']);
    TestBed.configureTestingModule({
      providers: [
        NewMemberService,
        { provide: AdminService, useValue: spy },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(NewMemberService);
    valueServiceSpy = TestBed.inject(
      AdminService
    ) as jasmine.SpyObj<AdminService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('"result$" should emit a Result<User> value when newMember emit a correct value', () => {
    valueServiceSpy.newMember.and.returnValue(
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
    service.newStaffUser({
      email: 'example',
      permissions: StaffAccessLevel.ADMIN,
    });
  });

  it('"success$" should emit a <User> value when newMember emit a correct value', () => {
    valueServiceSpy.newMember.and.returnValue(
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
    service.newStaffUser({
      email: 'example',
      permissions: StaffAccessLevel.ADMIN,
    });
  });

  it('"error$" should emit a "string" value when newMember emit a error value', () => {
    valueServiceSpy.newMember.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.error$.subscribe((data) => {
      expect(data).toEqual('some error');
    });
    service.newStaffUser({
      email: 'example',
      permissions: StaffAccessLevel.ADMIN,
    });
  });

  it('"loading$" should emit a "boolean" value when newMember emit any value', () => {
    valueServiceSpy.newMember.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.loading$.subscribe((data) => {
      data ? expect(data).toEqual(true) : expect(data).toEqual(false);
    });

    service.newStaffUser({
      email: 'example',
      permissions: StaffAccessLevel.ADMIN,
    });
  });
});
