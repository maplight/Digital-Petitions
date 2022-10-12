import { TestBed } from '@angular/core/testing';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedAdminService } from 'src/testing/mocked-admin-service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';
import { AdminService } from './admin.service';

import { GetImageDataService } from './get-image-data.service';

describe('GetImageDataService', () => {
  let service: GetImageDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GetImageDataService,
        { provide: AdminService, useClass: MockedAdminService },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(GetImageDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
