import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityStaffSiteDesignComponent } from './city-staff-site-design.component';

describe('CityStaffSiteDesignComponent', () => {
  let component: CityStaffSiteDesignComponent;
  let fixture: ComponentFixture<CityStaffSiteDesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityStaffSiteDesignComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CityStaffSiteDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
