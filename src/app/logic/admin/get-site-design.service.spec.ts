import { TestBed } from '@angular/core/testing';

import { GetSiteDesignService } from './get-site-design.service';

describe('GetSiteDesignService', () => {
  let service: GetSiteDesignService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetSiteDesignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
