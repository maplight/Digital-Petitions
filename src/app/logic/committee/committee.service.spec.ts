import { TestBed } from '@angular/core/testing';

import { CommitteeService } from './committee.service';

describe('CommitteeService', () => {
  let service: CommitteeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommitteeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
