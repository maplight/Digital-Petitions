import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BasicCardModule } from 'src/app/shared/basic-card/basic-card.module';
import { SuccessChangeRoutingModule } from './success-change-routing.module';

import { SuccessChangeComponent } from './success-change.component';

describe('SuccessChangeComponent', () => {
  let component: SuccessChangeComponent;
  let fixture: ComponentFixture<SuccessChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuccessChangeComponent],
      imports: [
        CommonModule,
        BasicCardModule,
        MatButtonModule,
        RouterModule,
        SuccessChangeRoutingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SuccessChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
