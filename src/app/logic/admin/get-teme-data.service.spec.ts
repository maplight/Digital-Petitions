import { TestBed } from '@angular/core/testing';

import { GetThemeDataService } from './get-theme-data.service';

describe('GetTemeDataService', () => {
  let service: GetThemeDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetThemeDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
