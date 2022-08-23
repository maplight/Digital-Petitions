import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentResultCityStaffComponent } from './current-result-city-staff.component';

describe('CurrentResultCityStaffComponent', () => {
  let component: CurrentResultCityStaffComponent;
  let fixture: ComponentFixture<CurrentResultCityStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentResultCityStaffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentResultCityStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
