import { TestBed } from '@angular/core/testing';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { of } from 'rxjs';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';
import { AdminService } from './admin.service';

import { SetSiteDesignService } from './set-site-design.service';

describe('SetSiteDesignService', () => {
  let service: SetSiteDesignService;

  let valueServiceSpy: jasmine.SpyObj<AdminService>;
  beforeEach(() => {
    const spy = jasmine.createSpyObj('AdminService', ['setThemeData']);
    TestBed.configureTestingModule({
      providers: [
        SetSiteDesignService,
        { provide: AdminService, useValue: spy },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(SetSiteDesignService);
    valueServiceSpy = TestBed.inject(
      AdminService
    ) as jasmine.SpyObj<AdminService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('"result$" should emit a Result<SiteConfiguration> value when newMember emit a correct value', () => {
    valueServiceSpy.setThemeData.and.returnValue(
      of({
        result: {
          __typename: 'SiteConfiguration',
          version: 0,
        },
      })
    );

    service.result$.subscribe((data) => {
      expect(data).toEqual({
        result: {
          __typename: 'SiteConfiguration',

          version: 0,
        },
      });
    });
    service.setSiteTemeData({ expectedVersion: 1 });
  });

  it('"success$" should emit a <SiteConfiguration> value when newMember emit a correct value', () => {
    valueServiceSpy.setThemeData.and.returnValue(
      of({
        result: {
          __typename: 'SiteConfiguration',
          version: 0,
        },
      })
    );

    service.success$.subscribe((data) => {
      expect(data).toEqual({
        __typename: 'SiteConfiguration',
        version: 0,
      });
    });
    service.setSiteTemeData({ expectedVersion: 1 });
  });

  it('"error$" should emit a "string" value when newMember emit a error value', () => {
    valueServiceSpy.setThemeData.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.error$.subscribe((data) => {
      expect(data).toEqual('some error');
    });
    service.setSiteTemeData({ expectedVersion: 1 });
  });

  it('"loading$" should emit a "boolean" value when newMember emit any value', () => {
    valueServiceSpy.setThemeData.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.loading$.subscribe((data) => {
      data ? expect(data).toEqual(true) : expect(data).toEqual(false);
    });

    service.setSiteTemeData({ expectedVersion: 1 });
  });
});
