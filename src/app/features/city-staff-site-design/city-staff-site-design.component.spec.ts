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
  SiteConfiguration,
  SiteConfigurationInput,
} from 'src/app/core/api/API';
import { SetSiteDesignService } from 'src/app/logic/admin/set-site-design.service';
import { ThemingService } from 'src/app/core/dynamic-theme/theming.service';

describe('CityStaffSiteDesignComponent', () => {
  let component: CityStaffSiteDesignComponent;
  let fixture: ComponentFixture<CityStaffSiteDesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
        ImagePickerModule,
        ErrorMsgModule,
        LoadingBarModule,
      ],
    })
      .overrideComponent(CityStaffSiteDesignComponent, {
        set: {
          providers: [
            {
              provide: SetSiteDesignService,
              useClass: MockedSetSiteDesignService,
            },
            {
              provide: ThemingService,
              useClass: MockedThemingService,
            },
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(CityStaffSiteDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
    return of(true);
  }

  setSiteTemeData(value: SiteConfigurationInput) {}
}

class MockedThemingService {
  public get error$(): Observable<string | undefined> {
    return new Observable();
  }

  public get theme$(): Observable<SiteConfiguration | undefined> {
    return new Observable();
  }

  public get version(): number {
    return 0;
  }

  public get success$(): Observable<SiteConfiguration | undefined> {
    return new Observable();
  }

  public get loading$(): Observable<boolean> {
    return of(true);
  }

  setSiteTemeData(value: SiteConfigurationInput) {}
}
