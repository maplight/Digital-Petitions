import { TestBed } from '@angular/core/testing';

import { NewMemberService } from './new-member.service';

describe('NewMemberService', () => {
  let service: NewMemberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewMemberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
