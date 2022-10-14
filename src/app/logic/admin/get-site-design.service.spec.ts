import { TestBed } from '@angular/core/testing';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedAdminService } from 'src/testing/mocked-admin-service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';
import { AdminService } from './admin.service';
import { of } from 'rxjs';
import { GetSiteDesignService } from './get-site-design.service';

describe('GetSiteDesignService', () => {
  let service: GetSiteDesignService;

  let valueServiceSpy: jasmine.SpyObj<AdminService>;
  beforeEach(() => {
    const spy = jasmine.createSpyObj('AdminService', ['getThemeData']);
    TestBed.configureTestingModule({
      providers: [
        GetSiteDesignService,
        { provide: AdminService, useValue: spy },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(GetSiteDesignService);
    valueServiceSpy = TestBed.inject(
      AdminService
    ) as jasmine.SpyObj<AdminService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('"result$" should emit a Result<SiteConfiguration> value when getThemeData emit a correct value', () => {
    valueServiceSpy.getThemeData.and.returnValue(
      of({
        result: {
          __typename: 'SiteConfiguration',
          version: 1,
        },
      })
    );

    service.result$.subscribe((data) => {
      expect(data).toEqual({
        result: {
          __typename: 'SiteConfiguration',
          version: 1,
        },
      });
    });
    service.getSiteThemeData();
  });

  it('"success$" should emit a <SiteConfiguration> value when getThemeData emit a correct value', () => {
    valueServiceSpy.getThemeData.and.returnValue(
      of({
        result: {
          __typename: 'SiteConfiguration',
          version: 1,
        },
      })
    );

    service.success$.subscribe((data) => {
      expect(data).toEqual({
        __typename: 'SiteConfiguration',
        version: 1,
      });
    });
    service.getSiteThemeData();
  });

  it('"error$" should emit a "string" value when getThemeData emit a error value', () => {
    valueServiceSpy.getThemeData.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.error$.subscribe((data) => {
      expect(data).toEqual('some error');
    });
    service.getSiteThemeData();
  });

  it('"loading$" should emit a "boolean" value when getThemeData emit any value', () => {
    valueServiceSpy.getThemeData.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.loading$.subscribe((data) => {
      data ? expect(data).toEqual(true) : expect(data).toEqual(false);
    });

    service.getSiteThemeData();
  });
});
