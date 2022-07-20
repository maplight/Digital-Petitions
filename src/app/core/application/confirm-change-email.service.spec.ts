import { TestBed } from '@angular/core/testing';

import { ConfirmChangeEmailService } from './confirm-change-email.service';

describe('ConfirmChangeEmailService', () => {
  let service: ConfirmChangeEmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmChangeEmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
