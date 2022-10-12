import { TestBed } from '@angular/core/testing';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedAdminService } from 'src/testing/mocked-admin-service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';
import { AdminService } from './admin.service';

import { RemoveMemberService } from './remove-member.service';

describe('RemoveMemberService', () => {
  let service: RemoveMemberService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RemoveMemberService,
        { provide: AdminService, useClass: MockedAdminService },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(RemoveMemberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
