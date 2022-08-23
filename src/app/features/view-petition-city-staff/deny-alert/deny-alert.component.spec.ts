import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenyAlertComponent } from './deny-alert.component';

describe('DenyAlertComponent', () => {
  let component: DenyAlertComponent;
  let fixture: ComponentFixture<DenyAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DenyAlertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DenyAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
