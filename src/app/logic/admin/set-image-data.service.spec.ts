import { TestBed } from '@angular/core/testing';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { of } from 'rxjs';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';
import { AdminService } from './admin.service';

import { SetImageDataService } from './set-image-data.service';

describe('SetImageDataService', () => {
  let service: SetImageDataService;

  let valueServiceSpy: jasmine.SpyObj<AdminService>;
  beforeEach(() => {
    const spy = jasmine.createSpyObj('AdminService', ['setImg']);
    TestBed.configureTestingModule({
      providers: [
        SetImageDataService,
        { provide: AdminService, useValue: spy },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(SetImageDataService);
    valueServiceSpy = TestBed.inject(
      AdminService
    ) as jasmine.SpyObj<AdminService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('"result$" should emit a Result<null> value when newMember emit a correct value', () => {
    valueServiceSpy.setImg.and.returnValue(
      of({
        result: null,
      })
    );

    service.result$.subscribe((data) => {
      expect(data).toEqual({
        result: null,
      });
    });
    service.setImageData({ url: 'url', img: new ArrayBuffer(1) });
  });

  it('"error$" should emit a "string" value when newMember emit a error value', () => {
    valueServiceSpy.setImg.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.error$.subscribe((data) => {
      expect(data).toEqual('some error');
    });
    service.setImageData({ url: 'url', img: new ArrayBuffer(1) });
  });

  it('"loading$" should emit a "boolean" value when newMember emit any value', () => {
    valueServiceSpy.setImg.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.loading$.subscribe((data) => {
      data ? expect(data).toEqual(true) : expect(data).toEqual(false);
    });

    service.setImageData({ url: 'url', img: new ArrayBuffer(1) });
  });
});
