import { TestBed } from '@angular/core/testing';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedAdminService } from 'src/testing/mocked-admin-service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';
import { AdminService } from './admin.service';

import { GetUrlDataService } from './get-url-data.service';

describe('GetUrlDataService', () => {
  let service: GetUrlDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GetUrlDataService,
        { provide: AdminService, useClass: MockedAdminService },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(GetUrlDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
