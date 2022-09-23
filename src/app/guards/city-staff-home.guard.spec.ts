import { TestBed } from '@angular/core/testing';

import { CityStaffGuard as CityStaffHomeGuard } from './city-staff-home.guard';

describe('CityStaffGuard', () => {
  let guard: CityStaffHomeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CityStaffHomeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
