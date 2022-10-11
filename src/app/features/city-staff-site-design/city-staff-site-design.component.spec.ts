import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AdminService } from 'src/app/logic/admin/admin.service';
import { ErrorMsgModule } from 'src/app/shared/error-msg/error-msg.module';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { PetitionCardModule } from 'src/app/shared/petition-card/petition-card.module';
import { ReturnLinkModule } from 'src/app/shared/return-link/return-link.module';
import { CityStaffSiteDesignRoutingModule } from './city-staff-site-design-routing.module';

import { CityStaffSiteDesignComponent } from './city-staff-site-design.component';
import { ColorPickerModule } from './color-picker/color-picker.module';
import { ImagePickerModule } from './image-picker/image-picker.module';
import { Observable, of } from 'rxjs';
import {
  ListResourcesInput,
  ResourceConnection,
  SiteConfiguration,
  SiteConfigurationInput,
} from 'src/app/core/api/API';
import { SetSiteDesignService } from 'src/app/logic/admin/set-site-design.service';
import { ThemingService } from 'src/app/core/dynamic-theme/theming.service';
import { ImagePickerComponent } from './image-picker/image-picker.component';
import { ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('CityStaffSiteDesignComponent', () => {
  let component: CityStaffSiteDesignComponent;
  let fixture: ComponentFixture<CityStaffSiteDesignComponent>;
  let _setSiteDesignService: SetSiteDesignService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [CityStaffSiteDesignComponent],
      imports: [
        CommonModule,
        CityStaffSiteDesignRoutingModule,
        ReturnLinkModule,
        MatInputModule,
        MatIconModule,
        ColorPickerModule,
        PetitionCardModule,
        MatButtonModule,

        ErrorMsgModule,
        LoadingBarModule,
        BrowserAnimationsModule,
      ],
      providers: [{ provide: ActivatedRoute, useValue: {} }],
    })
      .overrideComponent(CityStaffSiteDesignComponent, {
        set: {
          providers: [
            {
              provide: SetSiteDesignService,
              useClass: MockedSetSiteDesignService,
            },
            {
              provide: ImagePickerComponent,
              useValue: {},
            },
            {
              provide: ThemingService,
              useClass: MockedThemingService,
            },
          ],
        },
      })
      .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(CityStaffSiteDesignComponent);
    component = fixture.componentInstance;
    _setSiteDesignService =
      fixture.debugElement.injector.get(SetSiteDesignService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the loading bar when the data is loading', () => {
    spyOnProperty(_setSiteDesignService, 'loading$', 'get').and.returnValue(
      of(true)
    );
    fixture.detectChanges();

    const dpLoadingBars =
      fixture.debugElement.nativeElement.querySelectorAll('dp-loading-bar');

    expect(dpLoadingBars.length).toBe(1);
  });

  it('should not show the loading bar if the data is not loading', () => {
    spyOnProperty(_setSiteDesignService, 'loading$', 'get').and.returnValue(
      of(false)
    );

    fixture.detectChanges();

    const dpLoadingBars =
      fixture.debugElement.nativeElement.querySelectorAll('dp-loading-bar');

    expect(dpLoadingBars.length).toBe(0);
  });

  it('should show 3 color picker elements', () => {
    fixture.detectChanges();
    let colorpickers =
      fixture.debugElement.nativeElement.querySelectorAll('dp-color-picker');
    expect(colorpickers.length).toEqual(3);
  });

  it('should call the setSiteThemeData function when submit button is clicked and the form has a valid value', () => {
    let functionSpy = spyOn(_setSiteDesignService, 'setSiteTemeData');
    fixture.detectChanges();
    let colorpickers = fixture.debugElement.queryAll(By.css('dp-color-picker'));
    colorpickers[0].triggerEventHandler('eventColor', '#F0F0F0');
    colorpickers[1].triggerEventHandler('eventColor', '#F0F0F0');
    colorpickers[2].triggerEventHandler('eventColor', '#F0F0F0');
    let imagepicker = fixture.debugElement.queryAll(By.css('dp-image-picker'));
    imagepicker[0].triggerEventHandler('eventImg', 'someImg');
    component.submit();
    expect(functionSpy).toHaveBeenCalledOnceWith({
      buttonColor: '#F0F0F0',
      headerColor: '#F0F0F0',
      highlightColor: '#F0F0F0',
      logoImage: 'someImg',
      expectedVersion: 0,
    });
  });

  it('should not call the setSiteThemeData function when submit button is clicked and the form has a invalid value (should show a error message)', () => {
    let functionSpy = spyOn(_setSiteDesignService, 'setSiteTemeData');
    fixture.detectChanges();
    let colorpickers = fixture.debugElement.queryAll(By.css('dp-color-picker'));
    colorpickers[0].triggerEventHandler('eventColor', undefined);
    colorpickers[1].triggerEventHandler('eventColor', undefined);
    colorpickers[2].triggerEventHandler('eventColor', undefined);
    let imagepicker = fixture.debugElement.queryAll(By.css('dp-image-picker'));
    imagepicker[0].triggerEventHandler('eventImg', undefined);
    component.submit();
    fixture.detectChanges();
    const dpErrorMsg =
      fixture.debugElement.nativeElement.querySelectorAll('dp-error-msg');

    expect(dpErrorMsg.length).toBe(1);
  });

  it('should show the error element if an error ocurred and is not loading', () => {
    spyOnProperty(_setSiteDesignService, 'error$', 'get').and.returnValue(
      of('error')
    );

    spyOnProperty(_setSiteDesignService, 'loading$', 'get').and.returnValue(
      of(false)
    );

    fixture.detectChanges();

    const dpErrorMsg =
      fixture.debugElement.nativeElement.querySelectorAll('dp-error-msg');

    expect(dpErrorMsg.length).toBe(1);
  });

  it('should not show the error element if an error ocurred and the component is loading', () => {
    spyOnProperty(_setSiteDesignService, 'error$', 'get').and.returnValue(
      of('error')
    );

    spyOnProperty(_setSiteDesignService, 'loading$', 'get').and.returnValue(
      of(true)
    );

    fixture.detectChanges();

    const dpErrorMsg =
      fixture.debugElement.nativeElement.querySelectorAll('dp-error-msg');

    expect(dpErrorMsg.length).toBe(0);
  });
});

class MockedSetSiteDesignService {
  public get error$(): Observable<string | undefined> {
    return new Observable();
  }

  public get success$(): Observable<SiteConfiguration | undefined> {
    return new Observable();
  }

  public get loading$(): Observable<boolean> {
    return new Observable();
  }

  setSiteTemeData(value: SiteConfigurationInput) {}
}

class MockedThemingService {
  public get error$(): Observable<string | undefined> {
    return new Observable();
  }

  public get theme$(): Observable<SiteConfiguration | undefined> {
    return of({
      __typename: 'SiteConfiguration',
      buttonColor: '#FFFFFF',
      headerColor: '#FFFFFF',
      highlightColor: '#FFFFFF',
      logoImage: 'logo',
      version: 0,
    });
  }

  public get version(): number {
    return 0;
  }

  public get success$(): Observable<SiteConfiguration | undefined> {
    return new Observable();
  }

  public get loading$(): Observable<boolean> {
    return new Observable();
  }

  setSiteTemeData(value: SiteConfigurationInput) {}
}
