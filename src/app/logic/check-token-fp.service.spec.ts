import { TestBed } from '@angular/core/testing';

import { CheckTokenFpService } from './check-token-fp.service';

describe('CheckTokenFpService', () => {
  let service: CheckTokenFpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckTokenFpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
