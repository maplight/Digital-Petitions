import { TestBed } from '@angular/core/testing';

import { CompleteNewPasswordService } from './complete-new-password.service';

describe('CompleteNewPasswordService', () => {
  let service: CompleteNewPasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompleteNewPasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
