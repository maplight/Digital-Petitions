import { TestBed } from '@angular/core/testing';

import { ChangePersonalDetailsService } from './change-personal-details.service';

describe('ChangePersonalDetailsService', () => {
  let service: ChangePersonalDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangePersonalDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
