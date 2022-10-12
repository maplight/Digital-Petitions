import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { SiteConfiguration } from '../../api/API';
import { UserMenuModule } from '../user-menu/user-menu.module';
import { ThemingService } from '../../dynamic-theme/theming.service';

import { HeaderComponent } from './header.component';
import { ActivatedRoute } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [CommonModule, UserMenuModule],
      providers: [{ provide: ActivatedRoute, useValue: {} }],
    })
      .overrideComponent(HeaderComponent, {
        set: {
          providers: [
            {
              provide: ThemingService,
              useClass: MockedThemingService,
            },
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
class MockedThemingService {
  theme$: Observable<SiteConfiguration | null | undefined> = new Observable();
}
