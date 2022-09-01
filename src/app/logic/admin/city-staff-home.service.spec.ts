import { TestBed } from '@angular/core/testing';

import { CityStaffHomeService } from './city-staff-home.service';

describe('CityStaffHomeService', () => {
  let service: CityStaffHomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CityStaffHomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
