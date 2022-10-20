import { TestBed } from '@angular/core/testing';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedAdminService } from 'src/testing/mocked-admin-service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';
import { AdminService } from './admin.service';

import { NewMemberService } from './new-member.service';

describe('NewMemberService', () => {
  let service: NewMemberService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NewMemberService,
        { provide: AdminService, useClass: MockedAdminService },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(NewMemberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
