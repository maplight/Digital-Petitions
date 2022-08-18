import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityStaffHomeComponent } from './city-staff-home.component';

describe('HomeComponent', () => {
  let component: CityStaffHomeComponent;
  let fixture: ComponentFixture<CityStaffHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CityStaffHomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CityStaffHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
