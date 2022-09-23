import { TestBed } from '@angular/core/testing';

import { CityStaffAdminGuard } from './city-staff-admin.guard';

describe('CityStaffGuard', () => {
  let guard: CityStaffAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CityStaffAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
