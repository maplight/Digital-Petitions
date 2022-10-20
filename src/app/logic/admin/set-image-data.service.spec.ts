import { TestBed } from '@angular/core/testing';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedAdminService } from 'src/testing/mocked-admin-service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';
import { AdminService } from './admin.service';

import { SetImageDataService } from './set-image-data.service';

describe('SetImageDataService', () => {
  let service: SetImageDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SetImageDataService,
        { provide: AdminService, useClass: MockedAdminService },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(SetImageDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
