import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityStaffAdminComponent } from './city-staff-admin.component';

describe('AdminComponent', () => {
  let component: CityStaffAdminComponent;
  let fixture: ComponentFixture<CityStaffAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CityStaffAdminComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CityStaffAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
