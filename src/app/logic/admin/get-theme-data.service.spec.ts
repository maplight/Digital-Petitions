import { TestBed } from '@angular/core/testing';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { of } from 'rxjs';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';
import { AdminService } from './admin.service';

import { GetThemeDataService } from './get-theme-data.service';

describe('GetThemeDataService', () => {
  let service: GetThemeDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetThemeDataService],
    });
    service = TestBed.inject(GetThemeDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
