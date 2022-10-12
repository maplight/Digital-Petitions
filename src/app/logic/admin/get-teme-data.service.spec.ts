import { TestBed } from '@angular/core/testing';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedAdminService } from 'src/testing/mocked-admin-service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';
import { AdminService } from './admin.service';

import { GetThemeDataService } from './get-theme-data.service';

describe('GetTemeDataService', () => {
  let service: GetThemeDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GetThemeDataService,
        { provide: AdminService, useClass: MockedAdminService },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(GetThemeDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
