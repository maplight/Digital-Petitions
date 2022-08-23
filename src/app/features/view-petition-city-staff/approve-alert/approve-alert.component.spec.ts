import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveAlertComponent } from './approve-alert.component';

describe('AproveAlertComponent', () => {
  let component: ApproveAlertComponent;
  let fixture: ComponentFixture<ApproveAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApproveAlertComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ApproveAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
