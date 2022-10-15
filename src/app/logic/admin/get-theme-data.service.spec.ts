import { TestBed } from '@angular/core/testing';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { of } from 'rxjs';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';
import { AdminService } from './admin.service';

import { GetThemeDataService } from './get-theme-data.service';
import { API } from 'aws-amplify';

describe('GetThemeDataService', () => {
  let service: GetThemeDataService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GetThemeDataService,
        {
          provide: API,
          useValue: { graphql: () => Promise.resolve('hello') },
        },
      ],
    });
    service = TestBed.inject(GetThemeDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('changeAccountPermission should return a User object when the promise it succesful resolve', (done) => {
    API.graphql = jasmine.createSpy().and.returnValue(of('value'));
    service.updatedThemeData().subscribe((data) => {
      expect(data).toEqual('value');
      done();
    });
  });
});
