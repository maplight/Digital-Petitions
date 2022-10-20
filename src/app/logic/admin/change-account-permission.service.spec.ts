import { TestBed } from '@angular/core/testing';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedAdminService } from 'src/testing/mocked-admin-service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';
import { AdminService } from './admin.service';

import { ChangeAccountPermissionService } from './change-account-permission.service';

describe('ChangeAccountPermissionService', () => {
  let service: ChangeAccountPermissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ChangeAccountPermissionService,
        { provide: AdminService, useClass: MockedAdminService },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(ChangeAccountPermissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
