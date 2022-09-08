import { TestBed } from '@angular/core/testing';

import { SetSiteDesignService } from './set-site-design.service';

describe('SetSiteDesignService', () => {
  let service: SetSiteDesignService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetSiteDesignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
