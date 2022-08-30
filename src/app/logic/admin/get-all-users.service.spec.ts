import { TestBed } from '@angular/core/testing';

import { GetAllUsersService } from './get-all-users.service';

describe('GetAllUsersService', () => {
  let service: GetAllUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAllUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
