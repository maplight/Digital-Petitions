import { TestBed } from '@angular/core/testing';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedAdminService } from 'src/testing/mocked-admin-service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';
import { AdminService } from './admin.service';

import { GetSiteDesignService } from './get-site-design.service';

describe('GetSiteDesignService', () => {
  let service: GetSiteDesignService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GetSiteDesignService,
        { provide: AdminService, useClass: MockedAdminService },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(GetSiteDesignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
