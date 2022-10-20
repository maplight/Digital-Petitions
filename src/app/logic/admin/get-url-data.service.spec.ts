import { TestBed } from '@angular/core/testing';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { of } from 'rxjs';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';
import { AdminService } from './admin.service';

import { GetUrlDataService } from './get-url-data.service';

describe('GetUrlDataService', () => {
  let service: GetUrlDataService;

  let valueServiceSpy: jasmine.SpyObj<AdminService>;
  beforeEach(() => {
    const spy = jasmine.createSpyObj('AdminService', ['getUrlResource']);
    TestBed.configureTestingModule({
      providers: [
        GetUrlDataService,
        { provide: AdminService, useValue: spy },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(GetUrlDataService);
    valueServiceSpy = TestBed.inject(
      AdminService
    ) as jasmine.SpyObj<AdminService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('"result$" should emit a Result<string> value when getUrlResource emit a correct value', () => {
    valueServiceSpy.getUrlResource.and.returnValue(
      of({
        result: '',
      })
    );

    service.result$.subscribe((data) => {
      expect(data).toEqual({
        result: '',
      });
    });
    service.getURL();
  });

  it('"success$" should emit a <string> value when getUrlResource emit a correct value', () => {
    valueServiceSpy.getUrlResource.and.returnValue(
      of({
        result: 'example',
      })
    );

    service.success$.subscribe((data) => {
      expect(data).toEqual('example');
    });
    service.getURL();
  });

  it('"error$" should emit a "string" value when getUrlResource emit a error value', () => {
    valueServiceSpy.getUrlResource.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.error$.subscribe((data) => {
      expect(data).toEqual('some error');
    });
    service.getURL();
  });

  it('"loading$" should emit a "boolean" value when getUrlResource emit any value', () => {
    valueServiceSpy.getUrlResource.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.loading$.subscribe((data) => {
      data ? expect(data).toEqual(true) : expect(data).toEqual(false);
    });

    service.getURL();
  });
});
