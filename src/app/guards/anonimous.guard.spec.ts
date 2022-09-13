import { TestBed } from '@angular/core/testing';

import { AnonimousGuard } from './anonimous.guard';

describe('AnonimousGuard', () => {
  let guard: AnonimousGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AnonimousGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
