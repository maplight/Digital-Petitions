import { TestBed } from '@angular/core/testing';

import { GetUrlDataService } from './get-url-data.service';

describe('GetUrlDataService', () => {
  let service: GetUrlDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetUrlDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
