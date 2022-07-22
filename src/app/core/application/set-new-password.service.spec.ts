import { TestBed } from '@angular/core/testing';

import { SetNewPasswordService } from './set-new-password.service';

describe('SetNewPasswordService', () => {
  let service: SetNewPasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetNewPasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
