import { TestBed } from '@angular/core/testing';

import { CommitteeGuard } from './committee.guard';

describe('CommitteeGuard', () => {
  let guard: CommitteeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CommitteeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
