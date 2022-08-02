import { TestBed } from '@angular/core/testing';

import { CityStaffGuard } from './city-staff.guard';

describe('CityStaffGuard', () => {
  let guard: CityStaffGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CityStaffGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
