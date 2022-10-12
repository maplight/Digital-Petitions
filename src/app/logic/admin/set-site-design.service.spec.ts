import { TestBed } from '@angular/core/testing';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedAdminService } from 'src/testing/mocked-admin-service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';
import { AdminService } from './admin.service';

import { SetSiteDesignService } from './set-site-design.service';

describe('SetSiteDesignService', () => {
  let service: SetSiteDesignService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SetSiteDesignService,
        { provide: AdminService, useClass: MockedAdminService },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(SetSiteDesignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
