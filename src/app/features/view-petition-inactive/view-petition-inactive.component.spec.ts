import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { ActivatedRoute } from '@angular/router';
import { ErrorMsgModule } from 'src/app/shared/error-msg/error-msg.module';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { PetitionViewModule } from 'src/app/shared/petition-view/petition-view.module';
import { ReturnLinkModule } from 'src/app/shared/return-link/return-link.module';
import { ActivatedRouteStub } from 'src/testing/activated-route-stub';
import { StatusModule } from './status/status.module';
import { ViewPetitionInactiveRoutingModule } from './view-petition-inactive-routing.module';

import { ViewPetitionInactiveComponent } from './view-petition-inactive.component';

describe('ViewPetitionInactiveComponent', () => {
  let component: ViewPetitionInactiveComponent;
  let fixture: ComponentFixture<ViewPetitionInactiveComponent>;
  const activatedRoute = new ActivatedRouteStub();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewPetitionInactiveComponent],
      imports: [
        CommonModule,
        ViewPetitionInactiveRoutingModule,
        MatProgressBarModule,
        MatIconModule,
        PetitionViewModule,
        ReturnLinkModule,
        StatusModule,
        LoadingBarModule,
        ErrorMsgModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRoute,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewPetitionInactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
