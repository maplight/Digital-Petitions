import { TestBed } from '@angular/core/testing';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { of } from 'rxjs';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';
import { AdminService } from './admin.service';

import { RemoveMemberService } from './remove-member.service';

describe('RemoveMemberService', () => {
  let service: RemoveMemberService;

  let valueServiceSpy: jasmine.SpyObj<AdminService>;
  beforeEach(() => {
    const spy = jasmine.createSpyObj('AdminService', ['removeMember']);
    TestBed.configureTestingModule({
      providers: [
        RemoveMemberService,
        { provide: AdminService, useValue: spy },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(RemoveMemberService);
    valueServiceSpy = TestBed.inject(
      AdminService
    ) as jasmine.SpyObj<AdminService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('"result$" should emit a Result<User> value when newMember emit a correct value', () => {
    valueServiceSpy.removeMember.and.returnValue(
      of({
        result: 'success',
      })
    );

    service.result$.subscribe((data) => {
      expect(data).toEqual({
        result: 'success',
      });
    });
    service.removeMemeber('id');
  });

  it('"success$" should emit a <User> value when newMember emit a correct value', () => {
    valueServiceSpy.removeMember.and.returnValue(
      of({
        result: 'success',
      })
    );

    service.success$.subscribe((data) => {
      expect(data).toEqual('success');
    });
    service.removeMemeber('id');
  });

  it('"error$" should emit a "string" value when newMember emit a error value', () => {
    valueServiceSpy.removeMember.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.error$.subscribe((data) => {
      expect(data).toEqual('some error');
    });
    service.removeMemeber('id');
  });

  it('"loading$" should emit a "boolean" value when newMember emit any value', () => {
    valueServiceSpy.removeMember.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.loading$.subscribe((data) => {
      data ? expect(data).toEqual(true) : expect(data).toEqual(false);
    });

    service.removeMemeber('id');
  });
});
