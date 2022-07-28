import { TestBed } from '@angular/core/testing';

import { SignUpConfirmService } from './sign-up-confirm.service';

describe('SignUpConfirmService', () => {
  let service: SignUpConfirmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignUpConfirmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
