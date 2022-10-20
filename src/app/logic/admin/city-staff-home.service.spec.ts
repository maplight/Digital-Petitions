import { TestBed } from '@angular/core/testing';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedAdminService } from 'src/testing/mocked-admin-service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';
import { AdminService } from './admin.service';

import { CityStaffHomeService } from './city-staff-home.service';

describe('CityStaffHomeService', () => {
  let service: CityStaffHomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CityStaffHomeService,
        { provide: AdminService, useClass: MockedAdminService },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(CityStaffHomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
