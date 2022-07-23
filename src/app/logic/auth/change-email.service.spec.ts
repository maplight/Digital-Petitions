import { TestBed } from '@angular/core/testing';

import { ChangeEmailService } from './change-email.service';

describe('ChangeEmailService', () => {
  let service: ChangeEmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeEmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
