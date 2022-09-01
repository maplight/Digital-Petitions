import { TestBed } from '@angular/core/testing';

import { RemoveMemberService } from './remove-member.service';

describe('RemoveMemberService', () => {
  let service: RemoveMemberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemoveMemberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
