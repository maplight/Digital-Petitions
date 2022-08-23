import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPetitionCityStaffComponent } from './view-petition-city-staff.component';

describe('ViewPetitionCityStaffComponent', () => {
  let component: ViewPetitionCityStaffComponent;
  let fixture: ComponentFixture<ViewPetitionCityStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPetitionCityStaffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPetitionCityStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
