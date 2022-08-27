import { TestBed } from '@angular/core/testing';

import { LogginService } from './loggin.service';

describe('LogginService', () => {
  let service: LogginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
