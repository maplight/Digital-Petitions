import { TestBed } from '@angular/core/testing';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { of } from 'rxjs';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';
import { AdminService } from './admin.service';

import { GetImageDataService } from './get-image-data.service';
import { AssetType } from 'src/app/core/api/API';

describe('GetImageDataService', () => {
  let service: GetImageDataService;

  let valueServiceSpy: jasmine.SpyObj<AdminService>;
  beforeEach(() => {
    const spy = jasmine.createSpyObj('AdminService', ['getImg']);
    TestBed.configureTestingModule({
      providers: [
        GetImageDataService,
        { provide: AdminService, useValue: spy },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(GetImageDataService);
    valueServiceSpy = TestBed.inject(
      AdminService
    ) as jasmine.SpyObj<AdminService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('"result$" should emit a Result<ResourceConnection> value when getImg emit a correct value', () => {
    valueServiceSpy.getImg.and.returnValue(
      of({
        result: {
          __typename: 'ResourceConnection',
          items: ['test'],
        },
      })
    );

    service.result$.subscribe((data) => {
      expect(data).toEqual({
        result: {
          __typename: 'ResourceConnection',
          items: ['test'],
        },
      });
    });
    service.setListResources({ type: AssetType.LOGO });
  });

  it('"success$" should emit a <ResourceConnection> value when getImg emit a correct value', () => {
    valueServiceSpy.getImg.and.returnValue(
      of({
        result: {
          __typename: 'ResourceConnection',
          items: ['test'],
        },
      })
    );

    service.success$.subscribe((data) => {
      expect(data).toEqual({
        __typename: 'ResourceConnection',
        items: ['test'],
      });
    });
    service.setListResources({ type: AssetType.LOGO });
  });

  it('"error$" should emit a "string" value when getImg emit a error value', () => {
    valueServiceSpy.getImg.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.error$.subscribe((data) => {
      expect(data).toEqual('some error');
    });
    service.setListResources({ type: AssetType.LOGO });
  });

  it('"loading$" should emit a "boolean" value when getImg emit any value', () => {
    valueServiceSpy.getImg.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.loading$.subscribe((data) => {
      data ? expect(data).toEqual(true) : expect(data).toEqual(false);
    });

    service.setListResources({ type: AssetType.LOGO });
  });
});
