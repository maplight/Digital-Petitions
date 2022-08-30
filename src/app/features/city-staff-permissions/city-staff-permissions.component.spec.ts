import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityStaffPermissionsComponent } from './city-staff-permissions.component';

describe('CityStaffPermissionsComponent', () => {
  let component: CityStaffPermissionsComponent;
  let fixture: ComponentFixture<CityStaffPermissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityStaffPermissionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CityStaffPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
