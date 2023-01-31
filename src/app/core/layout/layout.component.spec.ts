import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ChangePasswordModalModule } from 'src/app/auth/change-password-modal/change-password-modal.module';
import { ChangePersonalDetailsModalModule } from 'src/app/auth/change-personal-details-modal/change-personal-details-modal.module';
import { EmailChangeModalModule } from 'src/app/auth/email-change-modal/email-change-modal.module';
import { BasicModalModule } from 'src/app/shared/basic-modal/basic-modal.module';
import { DialogResultModule } from 'src/app/shared/dialog-result/dialog-result.module';
import { ThemingService } from '../dynamic-theme/theming.service';
import { HeaderModule } from './header/header.module';
import { Observable } from 'rxjs';
import { LayoutComponent } from './layout.component';
import { SideMenuModule } from './side-menu/side-menu.module';
import { SiteConfiguration } from '../api/API';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LayoutComponent],
      imports: [
        CommonModule,
        HeaderModule,
        RouterModule,
        SideMenuModule,
        MatMenuModule,
        BasicModalModule,
        ChangePasswordModalModule,
        EmailChangeModalModule,
        MatDialogModule,
        ChangePersonalDetailsModalModule,
        MatSidenavModule,
        MatButtonModule,
        DialogResultModule,
        BrowserAnimationsModule,
      ],
    })
      .overrideComponent(LayoutComponent, {
        set: {
          providers: [
            {
              provide: ThemingService,
              useClass: MockedThemingService,
            },
            {
              provide: ActivatedRoute,
              useClass: activatedRoute,
            },
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
class MockedThemingService {
  public get error$(): Observable<string | undefined> {
    return new Observable();
  }
  public get loading$(): Observable<boolean> {
    return new Observable();
  }

  public get theme$(): Observable<SiteConfiguration | null | undefined> {
    return new Observable();
  }
  public get version(): number | undefined {
    return 0;
  }
}
class activatedRoute {
  public get snapshot() {
    return { data: { showMenu: false, showDemo: false } };
  }
}
