import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { ListResourcesInput, ResourceConnection } from 'src/app/core/api/API';
import { GetImageDataService } from 'src/app/logic/admin/get-image-data.service';
import { GetUrlDataService } from 'src/app/logic/admin/get-url-data.service';
import { SetImageDataService } from 'src/app/logic/admin/set-image-data.service';
import { ErrorMsgModule } from 'src/app/shared/error-msg/error-msg.module';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';

import { ImagePickerComponent } from './image-picker.component';

describe('ImagePickerComponent', () => {
  let component: ImagePickerComponent;
  let fixture: ComponentFixture<ImagePickerComponent>;
  let _getUrlDataService: GetUrlDataService;
  let _getImageDataService: GetImageDataService;
  let _setImageDataService: SetImageDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImagePickerComponent],
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatRippleModule,
        LoadingBarModule,
        ErrorMsgModule,
      ],
    })
      .overrideComponent(ImagePickerComponent, {
        set: {
          providers: [
            {
              provide: GetUrlDataService,
              useClass: MockedGetUrlDataService,
            },
            {
              provide: GetImageDataService,
              useClass: MockedGetImageDataService,
            },
            {
              provide: SetImageDataService,
              useClass: MockedSetImageDataService,
            },
          ],
        },
      })
      .compileComponents();
  });
  beforeEach(async () => {
    fixture = TestBed.createComponent(ImagePickerComponent);
    component = fixture.componentInstance;
    _getUrlDataService = fixture.debugElement.injector.get(GetUrlDataService);
    _getImageDataService =
      fixture.debugElement.injector.get(GetImageDataService);
    _setImageDataService =
      fixture.debugElement.injector.get(SetImageDataService);
  });
  it('should show the error element if an error ocurred and is not loading', () => {
    spyOnProperty(_getImageDataService, 'error$', 'get').and.returnValue(
      of('error')
    );

    fixture.detectChanges();

    const dpErrorMsg =
      fixture.debugElement.nativeElement.querySelectorAll('dp-error-msg');

    expect(dpErrorMsg.length).toBe(1);
  });

  it('should not show the error element if an error ocurred and the component is loading', () => {
    spyOnProperty(_getImageDataService, 'error$', 'get').and.returnValue(
      of('error')
    );

    spyOnProperty(_getImageDataService, 'loading$', 'get').and.returnValue(
      of(true)
    );
    fixture.detectChanges();

    const dpErrorMsg =
      fixture.debugElement.nativeElement.querySelectorAll('dp-error-msg');

    expect(dpErrorMsg.length).toBe(0);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('the eventImg element should emit when an image is selected', () => {
    component.eventImg.asObservable().subscribe((data) => {
      expect(data).toEqual('this');
    });
    component.onClickImg({ img: 'this', active: false });
  });

  it('must show as many images as the response from the service has', () => {
    spyOnProperty(_getImageDataService, 'success$', 'get').and.returnValue(
      of({
        __typename: 'ResourceConnection',
        items: ['item1', 'item2', 'item3', 'item4', 'item5'],
      })
    );
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelectorAll('img').length
    ).toEqual(5);
  });

  it('should call "setImageData" function when a new image in upload by user', () => {
    const functionSpy = spyOn(_setImageDataService, 'setImageData');
    spyOnProperty(_getUrlDataService, 'success$', 'get').and.returnValue(
      of('url')
    );
    let element = fixture.debugElement.query(By.css('input'));
    fixture.detectChanges();
    element.triggerEventHandler('change', {
      target: {
        files: {
          item(value: number): ArrayBuffer {
            return new ArrayBuffer(0);
          },
          length: 1,
        },
      },
    });
    expect(functionSpy).toHaveBeenCalled();
  });

  it('should not show the loading bar if the petition is not loading', () => {
    spyOnProperty(_getUrlDataService, 'loading$', 'get').and.returnValue(
      of(false)
    );

    fixture.detectChanges();

    const dpLoadingBars =
      fixture.debugElement.nativeElement.querySelectorAll('dp-loading-bar');

    expect(dpLoadingBars.length).toBe(0);
  });

  it('should show the loading bar when the petition is loading', () => {
    spyOnProperty(_getUrlDataService, 'loading$', 'get').and.returnValue(
      of(true)
    );
    fixture.detectChanges();

    const dpLoadingBars =
      fixture.debugElement.nativeElement.querySelectorAll('dp-loading-bar');

    expect(dpLoadingBars.length).toBe(1);
  });
});

class MockedGetUrlDataService {
  public get error$(): Observable<string | undefined> {
    return new Observable();
  }

  public get success$(): Observable<string | undefined> {
    return new Observable();
  }

  public get loading$(): Observable<boolean> {
    return new Observable();
  }
  getURL() {}
}

class MockedGetImageDataService {
  public get error$(): Observable<string | undefined> {
    return new Observable();
  }

  public get success$(): Observable<ResourceConnection | undefined> {
    return new Observable();
  }

  public get loading$(): Observable<boolean> {
    return new Observable();
  }
  setListResources(value: ListResourcesInput) {}
}

class MockedSetImageDataService {
  public get error$(): Observable<string | undefined> {
    return new Observable();
  }

  public get success$(): Observable<null | undefined> {
    return new Observable();
  }

  public get loading$(): Observable<boolean> {
    return new Observable();
  }
  setImageData(value: { url: string; img: File | Blob | ArrayBuffer }) {
    console.log(value);
  }
}
