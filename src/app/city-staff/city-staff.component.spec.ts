import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityStaffComponent } from './city-staff.component';

describe('CityStaffComponent', () => {
  let component: CityStaffComponent;
  let fixture: ComponentFixture<CityStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityStaffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CityStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
